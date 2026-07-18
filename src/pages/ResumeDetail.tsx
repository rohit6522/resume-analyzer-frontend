import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resumeService } from "@/services/resume.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Sparkles, Mail, Phone, Link, Code2 } from "lucide-react";
import { toast } from "sonner";
import type {
  ParsedResumeResponse,
  AtsScoreResponse,
} from "@/types/resume.types";

import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";
import type { JobMatchResponse } from "@/types/resume.types";

export default function ResumeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [parsedData, setParsedData] = useState<ParsedResumeResponse | null>(
    null,
  );
  const [atsScore, setAtsScore] = useState<AtsScoreResponse | null>(null);
  const [isLoadingParsed, setIsLoadingParsed] = useState(true);
  const [isGeneratingScore, setIsGeneratingScore] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [jobMatch, setJobMatch] = useState<JobMatchResponse | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  const resumeId = Number(id);

  useEffect(() => {
    const fetchParsedData = async () => {
      try {
        const data = await resumeService.getParsedData(resumeId);
        setParsedData(data);
      } catch (error) {
        console.error("Failed to load parsed data", error);
      } finally {
        setIsLoadingParsed(false);
      }
    };

    const fetchExistingAtsScore = async () => {
      try {
        const data = await resumeService.getAtsScore(resumeId);
        setAtsScore(data);
      } catch {
        // No score yet — that's fine, user can generate one
      }
    };

    fetchParsedData();
    fetchExistingAtsScore();
  }, [resumeId]);

  const handleGenerateScore = async () => {
    setIsGeneratingScore(true);
    try {
      const data = await resumeService.generateAtsScore(resumeId);
      setAtsScore(data);
      toast.success("ATS Score generated!");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to generate score";
      toast.error(message);
    } finally {
      setIsGeneratingScore(false);
    }
  };

  const handleMatchJob = async () => {
  if (!jobDescription.trim()) {
    toast.error("Please paste a job description first");
    return;
  }
  setIsMatching(true);
  try {
    const data = await resumeService.matchJob(resumeId, jobDescription);
    setJobMatch(data);
    toast.success("Job match analysis complete!");
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to match job";
    toast.error(message);
  } finally {
    setIsMatching(false);
  }
};

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Parsed Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Extracted Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingParsed ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          ) : parsedData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={parsedData.email}
              />
              <InfoRow
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value={parsedData.phone}
              />
              <InfoRow
                icon={<Link className="h-4 w-4" />}
                label="LinkedIn"
                value={parsedData.linkedin}
              />
              <InfoRow
                icon={<Code2 className="h-4 w-4" />}
                label="GitHub"
                value={parsedData.github}
              />
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No parsed data available.
            </p>
          )}
        </CardContent>
      </Card>

      {/* ATS Score Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ATS Score</CardTitle>
          <Button onClick={handleGenerateScore} disabled={isGeneratingScore}>
            <Sparkles className="h-4 w-4 mr-2" />
            {isGeneratingScore
              ? "Analyzing..."
              : atsScore
                ? "Regenerate Score"
                : "Generate Score"}
          </Button>
        </CardHeader>
        <CardContent>
          {isGeneratingScore ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : atsScore ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-foreground">
                  {atsScore.overallScore}
                  <span className="text-lg text-muted-foreground">/100</span>
                </div>
                <Badge
                  variant={
                    atsScore.overallScore >= 70 ? "default" : "secondary"
                  }
                >
                  {atsScore.overallScore >= 70 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ScoreBar label="Formatting" value={atsScore.formattingScore} />
                <ScoreBar label="Keywords" value={atsScore.keywordScore} />
                <ScoreBar label="Grammar" value={atsScore.grammarScore} />
                <ScoreBar label="Projects" value={atsScore.projectsScore} />
                <ScoreBar label="Experience" value={atsScore.experienceScore} />
                <ScoreBar label="Education" value={atsScore.educationScore} />
                <ScoreBar label="Skills" value={atsScore.skillsScore} />
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <TextBlock title="Strengths" content={atsScore.strengths} />
                <TextBlock title="Weaknesses" content={atsScore.weaknesses} />
                <TextBlock title="Suggestions" content={atsScore.suggestions} />
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No ATS score generated yet. Click "Generate Score" to analyze this
              resume with AI.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Job Description Matching Card */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Briefcase className="h-5 w-5" />
      Job Description Matching
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <Textarea
      placeholder="Paste the job description here..."
      value={jobDescription}
      onChange={(e) => setJobDescription(e.target.value)}
      rows={6}
    />
    <Button onClick={handleMatchJob} disabled={isMatching}>
      <Sparkles className="h-4 w-4 mr-2" />
      {isMatching ? "Analyzing..." : "Match Resume to Job"}
    </Button>

    {isMatching ? (
      <div className="space-y-3 pt-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    ) : jobMatch ? (
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-foreground">
            {jobMatch.matchPercentage}
            <span className="text-lg text-muted-foreground">%</span>
          </div>
          <Badge variant={jobMatch.matchPercentage >= 70 ? "default" : "secondary"}>
            {jobMatch.matchPercentage >= 70 ? "Strong Match" : "Needs Work"}
          </Badge>
        </div>

        <TextBlock title="Matched Skills" content={jobMatch.matchedSkills} />
        <TextBlock title="Missing Skills" content={jobMatch.missingSkills} />
        <TextBlock title="Recommendations" content={jobMatch.recommendations} />
      </div>
    ) : null}
  </CardContent>
</Card>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-md bg-accent flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value || "Not found"}</p>
      </div>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}/100</span>
      </div>
      <Progress value={value} />
    </div>
  );
}

function TextBlock({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}

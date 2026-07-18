import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resumeService } from "@/services/resume.service";
import { useAuth } from "@/context/AuthContext";
import FileUpload from "@/components/FileUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import type { ResumeResponse } from "@/types/resume.types";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const data = await resumeService.getAll();
      setResumes(data);
    } catch (error) {
      console.error("Failed to fetch resumes", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const activeResume = resumes.find((r) => r.active);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.fullName?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload your resume to get started with AI-powered analysis.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload onUploadSuccess={fetchResumes} />
        </CardContent>
      </Card>

      {!isLoading && resumes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Resumes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resumes.slice(0, 5).map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/resumes/${resume.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-accent flex items-center justify-center">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{resume.originalFileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(resume.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resume.active && <Badge>Active</Badge>}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
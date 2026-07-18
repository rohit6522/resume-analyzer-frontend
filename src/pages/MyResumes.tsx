import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resumeService } from "@/services/resume.service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { ResumeResponse } from "@/types/resume.types";

export default function MyResumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await resumeService.delete(id);
      toast.success("Resume deleted");
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete resume";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Resumes</h1>
        <p className="text-muted-foreground mt-1">
          All your uploaded resumes in one place.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : resumes.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">
              You haven't uploaded any resumes yet.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Upload your first resume
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {resumes.map((resume) => (
            <Card
              key={resume.id}
              className="cursor-pointer hover:border-foreground/20 transition-colors"
              onClick={() => navigate(`/resumes/${resume.id}`)}
            >
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{resume.originalFileName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{resume.fileType}</span>
                      <span>•</span>
                      <span>{formatFileSize(resume.fileSize)}</span>
                      <span>•</span>
                      <span>{new Date(resume.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {resume.active && <Badge>Active</Badge>}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    disabled={deletingId === resume.id}
                    onClick={(e) => handleDelete(e, resume.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
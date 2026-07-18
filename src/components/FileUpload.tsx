import { useState, useCallback, useRef, type DragEvent } from "react";
import { resumeService } from "@/services/resume.service";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onUploadSuccess: () => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF and DOCX files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }

    setIsUploading(true);
    try {
      await resumeService.upload(file);
      toast.success("Resume uploaded successfully!");
      onUploadSuccess();
    } catch (error: any) {
      const message = error.response?.data?.message || "Upload failed";
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
        isDragging ? "border-primary bg-accent" : "border-border"
      }`}
    >
      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Uploading & parsing resume...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center">
            <UploadCloud className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Drag & drop your resume here</p>
            <p className="text-sm text-muted-foreground">
              PDF or DOCX, up to 5MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileInput}
          />
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileText className="h-4 w-4 mr-2" />
            Browse files
          </Button>
        </div>
      )}
    </div>
  );
}
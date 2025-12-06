"use client";

import { useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/resuble_toast/toast";
import { uploadFileToDrive } from "@/services/ExamNoticesServices";

export default function GoogleDriveUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      showToast("Only PDF or Word files are allowed!", "error");
      return;
    }

    setFile(selectedFile);
  };

  const handleRemoveFile = () => setFile(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      showToast("Please provide both title and file", "warning");
      return;
    }

    setUploading(true);
    const result = await uploadFileToDrive(file, title);
    setUploading(false);

    if (result.success) {
      showToast("File uploaded successfully!", "success");
      setFile(null);
      setTitle("");
    } else {
      showToast(result.message || "Failed to upload file", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Upload className="w-6 h-6 text-blue-600" /> Upload File to Drive
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
     
        <input
          type="text"
          placeholder="File Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {!file ? (
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 gap-2 cursor-pointer hover:border-gray-400 transition-colors ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? (
              <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
            ) : (
              <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
                <FileText className="w-6 h-6 text-gray-700" />
              </div>
            )}

            <span className="text-gray-600 text-sm text-center">
              {uploading
                ? "Uploading..."
                : "Click to select PDF or Word file (Max 10 MB)"}
            </span>

            <input
              type="file"
              id="file-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-900 truncate">{file.name}</span>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemoveFile}
            >
              <X className="w-4 h-4 mr-1" /> Remove
            </Button>
          </div>
        )}

    
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 rounded-lg"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
}

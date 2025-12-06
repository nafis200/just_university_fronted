"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { deleteFileFromDrive } from "@/services/ExamNoticesServices";
import { showToast } from "@/components/resuble_toast/toast";
import { showDeleteAlert } from "@/components/resuble_toast/showDeleteAlert";

interface DriveFile {
  id: string;
  fileId: string;
  title: string;
  viewLink: string;
  downloadLink: string;
  createdAt: string;
}

export default function GoogleDriveList({ data }: { data: DriveFile[] }) {
  const [files, setFiles] = useState<DriveFile[]>(data);

  const handleDelete = async (fileId: string, title: string) => {
    const isConfirmed = await showDeleteAlert(title);

    if (!isConfirmed) return;
    const result = await deleteFileFromDrive(fileId);

    if (result.success) {
      showToast("File deleted successfully!", "success");
      setFiles((prev) => prev.filter((file) => file.fileId !== fileId));
    } else {
      showToast(result.message || "Failed to delete!", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Google Drive Files</h1>

      {files.length === 0 && (
        <p className="text-center text-gray-600">No files uploaded yet.</p>
      )}

      {files.length > 0 && (
        <div className="grid gap-4">
          {files.map((file) => (
            <div
              key={file.id || file.fileId}
              className="flex items-center justify-between p-4 border rounded hover:shadow-md transition"
            >
              <div>
                <p className="font-medium">{file.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(file.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={file.viewLink} target="_blank">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> View
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={() => handleDelete(file.fileId, file.title)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

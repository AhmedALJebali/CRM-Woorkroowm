import { supabase } from "@/lib/supabase/client";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface UseSupabaseUploadOptions {
  bucket: string;
  maxFileSizeMB?: number;
  allowedTypes?: string[];
  replaceOldFiles?: boolean;
}

export function useSupabaseUpload({
  bucket,
  maxFileSizeMB = 5,
  allowedTypes,
  replaceOldFiles = true,
}: UseSupabaseUploadOptions) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileNameToShow = selectedFile
    ? selectedFile.name
    : "No file chosen";

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      alert(`File too large. Max ${maxFileSizeMB}MB`);
      return;
    }
    if (allowedTypes && !allowedTypes.includes(file.type)) {
      alert("File type not allowed");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Show preview before upload
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    setUploading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("User not authenticated");
        return null;
      }

      const folderPath = `${user.id}/`;

      if (replaceOldFiles) {
        const { data: listData } = await supabase.storage.from(bucket).list(folderPath);
        if (listData && listData.length > 0) {
          await supabase.storage.from(bucket).remove(listData.map(f => folderPath + f.name));
        }
      }

      const filePath = `${folderPath}${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, selectedFile, { cacheControl: "3600", upsert: true });

      if (uploadError) {
        console.error(uploadError);
        alert("Error uploading file");
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath);

      return publicUrl;
    } finally {
      setUploading(false);
    }
  };

  return {
    preview,
    uploading,
    fileInputRef,
    fileNameToShow,
    handleFileSelect,
    uploadFile,
    selectedFile,
    setPreview
  };
}

import { supabase } from "@/lib/supabase/client";
import { ProfileFormData } from "@/lib/validators/profileSchema";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
export function useAvatarUpload(form: UseFormReturn<ProfileFormData>) {
  const [preview, setPreview] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const storedUrl = localStorage.getItem("avatarUrl");
    if (!storedUrl) return null;
    try {
      form.setValue("avatarUrl", storedUrl);
      return decodeURIComponent(storedUrl);
    } catch {
      return storedUrl;
    }
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileNameToShow = preview
    ? decodeURIComponent(
        preview.split("/").pop()?.split("?")[0] || "No file chosen"
      )
    : "No file chosen";

  const handleFileChange = async (avatarFile: File | null) => {
    if (!avatarFile) return;

    if (avatarFile.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB");
      return;
    }

    setUploading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("User not authenticated");
        setUploading(false);
        return;
      }

      const folderPath = `${user.id}/`;

      const { data: listData, error: listError } = await supabase.storage
        .from("avatars")
        .list(folderPath);

      if (listError) {
        console.error("Error listing avatars:", listError);
        alert("Error accessing avatar storage");
        setUploading(false);
        return;
      }

      if (listData && listData.length > 0) {
        const filesToRemove = listData.map((file) => folderPath + file.name);
        const { error: removeError } = await supabase.storage
          .from("avatars")
          .remove(filesToRemove);
        if (removeError) {
          console.error("Error removing old avatars:", removeError);
          alert("Error deleting old avatar");
          setUploading(false);
          return;
        }
      }

      const fileName = avatarFile.name;
      const filePath = `${folderPath}${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error(uploadError);
        alert("Error uploading avatar");
        setUploading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      form.setValue("avatarUrl", publicUrl);
      localStorage.setItem("avatarUrl", publicUrl);
      setPreview(publicUrl);
    } catch (error) {
      console.error("Avatar upload error:", error);
      alert("Error uploading avatar");
    } finally {
      setUploading(false);
    }
  };

  return {
    preview,
    uploading,
    fileInputRef,
    fileNameToShow,
    handleFileChange,
  };
}

"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import useImage from "@/hooks/useImage";
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { setImage, setAnnotatedImage, setMetadata, clearImage } = useImage();
  
  const displayFileName = file && file.name.length>18
    ? `${file.name.slice(0, 16)}..${file.name.slice(-4)}`
    : "Choose Image";
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a image to upload.");
      return;
    }
    clearImage();
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/detect_objects`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { annotated_image, class_count } = uploadResponse.data;
      setImage(file);
      setAnnotatedImage(annotated_image);
      setMetadata(class_count);
      toast.success("Upload successful!");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Upload failed.");
    }
    setUploading(false);
  };
  return (
    <div className="flex flex-col py-6">
      <div className="flex items-center justify-center py-9">
        <form className="flex flex-row gap-2" onSubmit={handleUpload}>
          <label
            htmlFor="image"
            className="py-2 px-3 text-center overflow-x-hidden w-72 whitespace-nowrap overflow-ellipsis border-[1px] border-slate-500 rounded-md hover:cursor-pointer"
          >
            {displayFileName}
            <Input
              className="my-4 hidden"
              id="image"
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setFile(files[0]);
                }
              }}
              accept="image/png, image/jpeg"
            />
          </label>
          <Button className="" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;

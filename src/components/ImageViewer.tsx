"use client";

import { Post } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Download, X } from "lucide-react";
import React from "react";

interface ImageViewerProps {
  post: Post | null;
  onClose: () => void;
}

export default function ImageViewer({ post, onClose }: ImageViewerProps) {
  if (!post) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(post.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${post.prompt.replace(/\s+/g, "_")}.png`; // Generate filename from prompt
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex pt-24 items-start justify-center p-4">
      <div className="relative w-full max-w-[52rem] max-h-[90vh] bg-transparent rounded-lg overflow-hidden">
        <button
          onClick={handleDownload}
          className="absolute top-2 right-12 z-10 p-1 bg-gray-800/50 rounded-full text-white hover:bg-gray-800"
        >
          <Download size={24} />
        </button>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1 bg-gray-800/50 rounded-full text-white hover:bg-gray-800"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="relative w-full h-[80vh]">
          <Image
            src={post.url}
            alt={post.prompt}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Footer with Prompt and Download Button */}
        {/* <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <p className="text-sm truncate max-w-[70%]">{post.prompt}</p>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </Button>
        </div> */}
      </div>
    </div>
  );
}

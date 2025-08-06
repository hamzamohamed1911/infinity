"use client";

import { useEffect, useState } from "react";
import { decryptVideo } from "@/lib/utils/decryptVideo";

function getYoutubeId(url: string): string | null {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
}

export default function Player1({ encrypted }: { encrypted: string }) {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const decrypted = decryptVideo(encrypted);
    const videoId = getYoutubeId(decrypted);
    if (videoId) {
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    }
  }, [encrypted]);

  return embedUrl ? (
    <iframe
      width="100%"
      height="100%"
      className="w-full 2xl:min-h-96  min-h-72 mt-4"
      src={embedUrl}
      title="YouTube Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <p>جاري تحميل الفيديو...</p>
  );
}

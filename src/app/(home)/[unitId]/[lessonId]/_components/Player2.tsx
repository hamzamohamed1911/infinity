"use client";

import { useEffect, useState } from "react";
import { decryptVideo } from "@/lib/utils/decryptVideo";

function getVimeoId(url: string): string | null {
  const regex = /vimeo\.com\/(?:video\/)?(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function Player2({ encrypted }: { encrypted: string }) {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const decrypted = decryptVideo(encrypted);

    const videoId = getVimeoId(decrypted);
    if (videoId) {
      setEmbedUrl(`https://player.vimeo.com/video/${videoId}`);
    }
  }, [encrypted]);

  return embedUrl ? (
    <iframe
      width="100%"
      height="100%"
      className="w-full 2xl:min-h-96  min-h-72 mt-4 md:rounded-lg rounded-none"
      src={embedUrl}
      title="YouTube Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <p>جاري تحميل الفيديو...</p>
  );
}

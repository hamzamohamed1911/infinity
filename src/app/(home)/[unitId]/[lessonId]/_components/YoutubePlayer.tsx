"use client";

import { useEffect, useState } from "react";
import { decryptVideo } from "@/lib/utils/decryptVideo";

// دالة لاستخراج الـ videoId من أي نوع من روابط YouTube
function getYoutubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function YoutubePlayer({ encrypted }: { encrypted: string }) {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    try {
      const decrypted = decryptVideo(encrypted);
      if (!decrypted) return;

      const videoId = getYoutubeId(decrypted.trim());
      if (videoId) {
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
      } else {
        console.error("لم يتم استخراج videoId من:", decrypted);
      }
    } catch (e) {
      console.error("خطأ أثناء معالجة الفيديو:", e);
    }
  }, [encrypted]);

  return embedUrl ? (
    <iframe
      width="100%"
      height="100%"
      className="w-full 2xl:min-h-96 min-h-72 mt-4 md:rounded-lg rounded-none"
      src={embedUrl}
      title="YouTube Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <p>جاري تحميل الفيديو...</p>
  );
}

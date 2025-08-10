"use client";

import { useEffect, useState } from "react";

export default function Player3({
  googleDriveId,
}: {
  googleDriveId: string | null;
}) {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    if (googleDriveId) {
      setEmbedUrl(`https://drive.google.com/file/d/${googleDriveId}/preview`);
    }
  }, [googleDriveId]);

  return embedUrl ? (
    <iframe
      width="100%"
      height="100%"
      className="w-full 2xl:min-h-96 min-h-72 mt-4"
      src={embedUrl}
      title="Google Drive Video"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <p>جاري تحميل الفيديو...</p>
  );
}

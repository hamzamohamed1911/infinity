"use client";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/payments/get-html");
      const data = await res.json();
      setHtml(data.html);
    })();
  }, []);

  if (!html) return <p>جارى التحميل...</p>;

  return (
    <section className="h-screen w-screen">
      <iframe srcDoc={html} className="w-full h-screen border-0" />
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function NewQuestionForm() {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    setQuestion("");
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">اكتب سؤالك</h2>
      <Textarea
        placeholder="اكتب سؤالك هنا..."
        value={question}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
        className="resize-none"
      />
      <div className="w-full flex justify-end my-4">
              <Button className="text-white" onClick={handleSubmit}>نشر السؤال</Button>

      </div>
    </div>
  );
}

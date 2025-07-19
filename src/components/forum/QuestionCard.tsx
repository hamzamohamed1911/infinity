"use client";

import Image from "next/image";
import { Comment } from "./Comment";

type Props = {
  question: string;
  author: string;
  authorimg: string;
  comments: {
    id: number;
    text: string;
    author: string;
    replies: { text: string; author: string ; authorimg: string; }[];
  }[];
};

export function QuestionCard({ question, author, comments, authorimg }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm space-y-3">
      <div>
        <p className="text-lg font-medium">{question}</p>
        <div className="flex gap-2  items-center">
          <Image
            className="size-12 rounded-full object-cover border-primary border-2"
            alt={author}
            width={30}
            height={30}
            src={authorimg}
          />
          <p className="text-sm text-gray-500">بواسطة {author}</p>
        </div>
      </div>

      <div className="space-y-2">
        {comments.map((c) => (
          <Comment key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}

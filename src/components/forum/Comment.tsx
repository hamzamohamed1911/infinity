import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiFillLike } from "react-icons/ai";

type Reply = {
  text: string;
  author: string;
  authorimg: string;
};

type Props = {
  text: string;
  author: string;
  replies: Reply[];
};

export function Comment({ text, author, replies }: Props) {
  const [likes, setLikes] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="border p-3 rounded-md bg-gray-50">
      <p className="font-semibold">{author}</p>
      <p>{text}</p>

      <div className="flex gap-3 mt-2">
        <Button size="sm" variant="ghost" onClick={() => setLikes(likes + 1)}>
          <AiFillLike/> ({likes})
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setShowReply(!showReply)}>
          رد
        </Button>
      </div>

      {showReply && (
        <div className="mt-2 space-y-2">
          <Textarea
            value={replyText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setReplyText(e.target.value)
            }
            placeholder="اكتب ردك هنا..."
            className="resize-none"
          />
          <Button
            size="sm"
            onClick={() => {
              setReplyText("");
              setShowReply(false);
            }}
          >
            إرسال الرد
          </Button>
        </div>
      )}

      {/* عرض الردود */}
      {replies.length > 0 && (
        <div className="ml-4 mt-3 space-y-2">
          {replies.map((reply, i) => (
            <div key={i} className="flex items-start gap-2 border-l-2 pl-2">
              <Image
                src={reply.authorimg}
                alt={reply.author}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">{reply.author}</p>
                <p className="text-sm text-gray-700">{reply.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { QuestionCard } from "@/components/forum/QuestionCard";

export default function ForumPage() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      {/* سؤال عن اللغة العربية */}
      <div className="space-y-4">
        <QuestionCard
          question="ما الفرق بين الهمزة المتطرفة والهمزة المتوسطة في اللغة العربية؟"
          author="سارة أحمد"
          authorimg="https://i.pravatar.cc/150?u"
          comments={[
            {
              id: 1,
              text: "الهمزة المتوسطة تأتي في وسط الكلمة مثل 'سأل'، بينما المتطرفة تأتي في النهاية مثل 'شاء'.",
              author: "أحمد جمال",
              replies: [
                {
                  text: "بالضبط! وغالبًا ما تحدد حركة الحرف الذي قبل الهمزة موضعها.",
                  author: "نهى ياسر",
                  authorimg: "https://i.pravatar.cc/150?u=noha",
                },
                {
                  text: "كمان شكل الهمزة بيتغير حسب الحرف السابق لها.",
                  author: "ليلى محمد",
                  authorimg: "https://i.pravatar.cc/150?u=laila",
                },
              ],
            },
            {
              id: 2,
              text: "من قواعد كتابة الهمزة أن ننظر لحركة الحرف الذي قبلها، الأقوى هو الذي يحدد شكلها.",
              author: "خالد عبد الله",
              replies: [
                {
                  text: "معلومة مهمة جدًا، خاصة في كتابة الإنشاء.",
                  author: "إيمان فوزي",
                  authorimg: "https://i.pravatar.cc/150?u=eman",
                },
              ],
            },
            {
              id: 3,
              text: "هل هناك قاعدة سهلة لحفظ أنواع الهمزات؟",
              author: "ريم حسين",
              replies: [
                {
                  text: "فيه قاعدة اسمها (أيو)، تساعدك في تحديد الشكل حسب الحركة الأقوى.",
                  author: "عبد الرحمن كمال",
                  authorimg: "https://i.pravatar.cc/150?u=abdelrahman",
                },
              ],
            },
            {
              id: 4,
              text: "أنا دائمًا أتلخبط في كتابة 'مساءً'، هل هي صحيحة؟",
              author: "عمرو عادل",
              replies: [
                {
                  text: "نعم، لأنها منصوبة بالفتحة والهمزة متطرفة على ألف.",
                  author: "دعاء هشام",
                  authorimg: "https://i.pravatar.cc/150?u=doaa",
                },
              ],
            },
          ]}
        />
      </div>
    </main>
  );
}

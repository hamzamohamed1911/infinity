import { AlarmClock } from "lucide-react";

export default function QuestionsBankPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-backgroundColor">
      <div className="max-w-xl w-full text-center p-8  backdrop-blur-xl rounded-3xl shadow-2xl bg-gradient-to-br from-primary via-purple-700 to-purple-900">
        <div className="flex justify-center mb-6">
          <AlarmClock className="w-20 h-20 text-white animate-pulse" />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 !leading-loose">
          بنك الأسئلة قادم قريباً
        </h1>

        <p className="text-md md:text-lg text-gray-200 mb-8 !leading-8">
          نحن نعمل حالياً على إعداد أفضل بنك أسئلة لمساعدتك على المذاكرة. ترقبوا
          الإطلاق قريباً!
        </p>

        <button className="mt-8 px-8 py-3 rounded-xl bg-white text-primary font-bold   transition-all">
          اشترك ليصلك إشعار عند الإطلاق
        </button>
      </div>
    </div>
  );
}

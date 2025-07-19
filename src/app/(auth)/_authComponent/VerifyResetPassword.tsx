import React, { useRef, useState } from "react";

const VerifyResetPassword = () => {
  const email = "example@email.com";
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (/[^0-9]/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <section dir="rtl" className="flex items-center justify-center">
      <div className="w-full max-w-lg p-6">
        <form className="space-y-4">
          <h2 className="font-semibold my-4 text-secondary text-4xl text-center">
            تأكيد الرمز
          </h2>
          <div className="flex flex-col gap-2 justify-center items-center text-secondary font-semibold">
            <span className="block text-xl ">تم إرسال بريد إلكتروني إلى:</span>
            <span className="block text-primary">{email}</span>
          </div>
          <p className="font-medium text-xl text-secondary text-right">
            ادخل رمز التحقق لتتمكن من استعادة كلمة المرور
          </p>

          <div className="flex gap-4 justify-center py-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                placeholder="-"
                className="w-14 h-14 text-center text-xl font-bold border-[2px] rounded-full focus:outline-none text-primary border-[#8F8F8F] focus:border-primary focus:text-primary"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-primary text-white hover:bg-[#5A3DA0] transition-colors text-xl font-semibold shadow-md"
          >
            تأكيد
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerifyResetPassword;
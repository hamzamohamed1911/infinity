//decrypt/route.ts
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  try {
    const { encrypted } = await req.json();
    const secretKey = req.headers.get("x-secret-key");

    if (secretKey !== process.env.SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // نفس دالة الـ decrypt اللي عندك
    const strPwd = "Cb9eGT2s#~";
    const strIv = "3#t;fV._N[";

    const keyHash = CryptoJS.SHA256(strPwd).toString();
    const ivHash = CryptoJS.SHA256(strIv).toString();

    const key = CryptoJS.enc.Utf8.parse(keyHash.slice(0, 32));
    const iv = CryptoJS.enc.Utf8.parse(ivHash.slice(0, 16));

    const base64Decoded = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Base64.parse(encrypted)
    );

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(base64Decoded),
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);

    return NextResponse.json({ decrypted: result });
  } catch (err) {
    console.error("Decrypt error:", err);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}

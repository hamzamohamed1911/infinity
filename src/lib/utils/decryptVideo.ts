// lib/utils/decryptVideo.ts
import CryptoJS from "crypto-js";

export function decryptVideo(payload: string): string {
  try {
    const strPwd = "Cb9eGT2s#~";
    const strIv = "3#t;fV._N[";

    const keyHash = CryptoJS.SHA256(strPwd).toString(); // full 64 hex characters
    const ivHash = CryptoJS.SHA256(strIv).toString();

    const key = CryptoJS.enc.Utf8.parse(keyHash.slice(0, 32)); // 32-char key
    const iv = CryptoJS.enc.Utf8.parse(ivHash.slice(0, 16)); // 16-char IV

    const base64Decoded = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Base64.parse(payload)
    );

    // ثاني خطوة: نفك تشفير AES
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(base64Decoded),
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    return result;
  } catch (e) {
    console.error("🔐 خطأ في فك التشفير:", e);
    return "";
  }
}

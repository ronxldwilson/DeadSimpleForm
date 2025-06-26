// lib/crypto.ts
import { Buffer } from 'buffer'

// Replace this with a securely stored 256-bit base64 key (e.g., in env var)
const ENCRYPTION_KEY = process.env.FORM_ENCRYPTION_SECRET!; // Must be 32 bytes base64

export async function encryptJSON(data: any): Promise<string> {
  const plaintext = JSON.stringify(data)
  const key = Buffer.from(ENCRYPTION_KEY, 'base64')

  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoder = new TextEncoder()

  try {
    const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "AES-GCM" }, false, ["encrypt"])
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cryptoKey, encoder.encode(plaintext))
    const encrypted = Buffer.concat([Buffer.from(iv), Buffer.from(ciphertext)])
    return encrypted.toString("base64")
  } catch (err) {
    console.error("Encryption failed:", err)
    throw new Error("Encryption failed")
  }
}

export async function decryptJSON(encryptedBase64: string): Promise<any> {
  const encryptedBuffer = Buffer.from(encryptedBase64, 'base64');
  const iv = encryptedBuffer.subarray(0, 12); // first 12 bytes = IV
  const data = encryptedBuffer.subarray(12);  // rest = ciphertext

  const key = Buffer.from(ENCRYPTION_KEY, 'base64');
  const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "AES-GCM" }, false, ["decrypt"]);

  try {
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, cryptoKey, data);
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decrypted));
  } catch (e) {
    console.error("Decryption failed:", e);
    return null;
  }
}
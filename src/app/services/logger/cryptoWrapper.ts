import { AES, enc, SHA256, WordArray } from 'crypto-js';

export class CryptoWrapper {
    public encrypt(message: string, secret: string = 'secret'): WordArray {
        const userIdEncrypted = AES.encrypt(message, secret, SHA256);
        return userIdEncrypted;
    }

    public decrypt(encrypted: WordArray, secret: string = 'secret'): string {
        return AES.decrypt(encrypted, secret, SHA256).toString(enc.Utf8);
    }
}

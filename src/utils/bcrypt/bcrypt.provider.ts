export abstract class BcryptProvider {
  abstract hashPassword(payload: string): Promise<string>;
  abstract comparePassword(payload: string, hash: string): Promise<boolean>;
}

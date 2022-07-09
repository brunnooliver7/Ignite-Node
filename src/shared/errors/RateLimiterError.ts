import { AppError } from "./AppError";

export namespace RateLimiterError {
  export class TooManyRequest extends AppError {
    constructor() {
      super("Too many requests", 429);
    }
  }
}

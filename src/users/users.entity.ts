import { UnprocessableEntityException } from "@nestjs/common";

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string | null,
  ) {
    this.validateUserOrFail();
  }

  private validateUserOrFail() {
    this.validateNameOrFail();

    this.validateEmailOrFail();

    this.validatePasswordOrFail();
  }

  private validateNameOrFail() {
    if (!this.name || typeof this.name !== 'string') {
      throw new UnprocessableEntityException();
    }
  }

  private validateEmailOrFail() {
    if (!this.email || typeof this.email !== 'string') {
      throw new UnprocessableEntityException();
    }
  }

  private validatePasswordOrFail() {
    if (!this.password || typeof this.password !== 'string') {
      throw new UnprocessableEntityException();
    }
  }
}

import { RuntimeError } from './runtime-error';
import { Token } from './token';

export class Environment {
  private readonly values: { [key: string]: any } = {};
  private readonly enclosing: Environment | null;

  constructor(enclosing?: Environment) {
    this.enclosing = enclosing || null;
  }

  define(name: string, value: any): void {
    this.values[name] = value;
  }

  get(name: Token): any {
    if (name.lexeme in this.values) {
      return this.values[name.lexeme];
    } else if (this.enclosing) {
      return this.enclosing.get(name);
    }

    throw new RuntimeError(name, `Undefined variable '${name.lexeme}'`);
  }

  assign(name: Token, value: any): void {
    if (name.lexeme in this.values) {
      this.values[name.lexeme] = value;
    } else if (this.enclosing) {
      this.enclosing.assign(name, value);
    } else {
      throw new RuntimeError(name, `Undefined variable '${name.lexeme}'`);
    }
  }
}
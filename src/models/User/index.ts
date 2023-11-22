import { v4 as uuidv4 } from 'uuid';

export class User {
  private constructor(
    private _fullName: string,
    private _email: string,
    private _phone: string,
    readonly id: string
  ) {}

  get fullName(): string {
    return this.fullName;
  }

  get email(): string {
    return this.email;
  }

  get phone(): string {
    return this.phone;
  }

  static create(
    fullName: string,
    email: string,
    phone: string,
    id: string = uuidv4()
  ): User {
    this.validateFullName(fullName);
    this.validateEmail(email);
    this.validatePhone(phone);

    return new User(fullName, email, phone, id);
  }

  private static validateFullName(fullName: string): boolean {
    const regex = new RegExp('^[a-zA-Z\\s]{6,120}$');

    const fullNameIsValid = regex.test(fullName);
    if (fullNameIsValid) return fullNameIsValid;

    throw new Error(
      'Nome Inválido! \nPor gentileza informar o nome completo, possuindo no minimo 6 caracteres e no maximo 120 caracteres'
    );
  }

  private static validateEmail(email: string): boolean {
    const regex = new RegExp(
      '^\\w+([\\.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$'
    );

    const emailIsValid = regex.test(email);
    if (emailIsValid) return emailIsValid;

    throw new Error(
      'Email Inválido! \nPor gentileza informar email com formato correto - Exemplo: email@dominio.com'
    );
  }

  private static validatePhone(phone: string): boolean {
    const regex = new RegExp(
      '^(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])?(?:[2-8]|9?[0-9])[0-9]{3}[0-9]{4}$'
    );

    const phoneIsValid = regex.test(phone);
    if (phoneIsValid) return phoneIsValid;

    throw new Error(
      'Telefone Inválido! \nPor gentileza informar o telefone só com os numeros - Exemplo: 11982536238 ou 1182536238'
    );
  }
}

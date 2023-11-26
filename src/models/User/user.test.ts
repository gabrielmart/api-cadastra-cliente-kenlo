import { User } from '.';

describe('Model User', () => {
  it('should create user', () => {
    const user = User.create(
      'Gabriel Martins',
      'email@email.com',
      '11982511217'
    );
    expect(user).toBeInstanceOf(User);
  });

  it('should not create user with undefined id', () => {
    const user = User.create(
      'Gabriel Martins',
      'email@email.com',
      '11982511217'
    );
    expect(user.id).toBeDefined();
  });

  it('should create user with full name longer than 6 characters and less than 120', () => {
    const user = User.create(
      'Gabriel Martins',
      'email@email.com',
      '1182511217'
    );
    expect(user).toBeInstanceOf(User);
  });

  it('should create user with create a user with a 6 character full name', () => {
    const user = User.create('Camila', 'email@email.com', '1182511217');
    expect(user).toBeInstanceOf(User);
  });

  it('should create user with create a user with a 120 character full name', () => {
    const user = User.create(
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      'email@email.com',
      '1182511217'
    );
    expect(user).toBeInstanceOf(User);
  });

  it('should not create a user with a full name shorter than 6 characters', () => {
    expect(() => {
      User.create('Lucas', 'email@email.com', '11982511217');
    }).toThrow(
      'Nome Inválido! \nPor gentileza informar o nome completo, possuindo no minimo 6 caracteres e no maximo 120 caracteres'
    );
  });

  it('should not create a user with a full name longer than 120 characters', () => {
    expect(() => {
      User.create(
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'email@email.com',
        '11982511217'
      );
    }).toThrow(
      'Nome Inválido! \nPor gentileza informar o nome completo, possuindo no minimo 6 caracteres e no maximo 120 caracteres'
    );
  });

  it('should not create user with email without a domain', () => {
    expect(() => {
      User.create('Gabriel Martins', 'email@.com', '11982511217');
    }).toThrow(
      'Email Inválido! \nPor gentileza informar email com formato correto - Exemplo: email@dominio.com'
    );
  });

  it('should not create a user if the phone number has characters other than numeric characters', () => {
    expect(() => {
      User.create('Gabriel Martins', 'email@email.com', '1198251121a');
    }).toThrow(
      'Telefone Inválido! \nPor gentileza informar o telefone só com os numeros - Exemplo: 11982536238'
    );
  });

  it('should not create a user if phone number with less than 10 numeric digits', () => {
    expect(() => {
      User.create('Gabriel Martins', 'email@email.com', '118251121');
    }).toThrow(
      'Telefone Inválido! \nPor gentileza informar o telefone só com os numeros - Exemplo: 11982536238'
    );
  });

  it('should create a user with a phone number that does not have the digit 9 after the area code', () => {
    const user = User.create(
      'Gabriel Martins',
      'email@email.com',
      '1182511217'
    );
    expect(user).toBeInstanceOf(User);
  });

  it('should not create a user with a phone number with an invalid area code', () => {
    expect(() => {
      User.create('Gabriel Martins', 'email@email.com', '90982511217');
    }).toThrow(
      'Telefone Inválido! \nPor gentileza informar o telefone só com os numeros - Exemplo: 11982536238'
    );
  });
});

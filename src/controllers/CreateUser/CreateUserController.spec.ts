// import testDB from '../../../test/connect-db';
import request from 'supertest';
import { app } from '../../app';
import { MongoClient } from '../../database/mongoClient';

describe('Create User Controller', () => {
  beforeEach(async () => {
    await MongoClient.connect();
  });

  afterEach(async () => {
    await MongoClient.client
      .db(process.env.MONGODB_DATABASE_NAME)
      .collection('users')
      .deleteMany();
    await MongoClient.client.close();
  });

  afterAll(async () => {
    await MongoClient.connect();
    await MongoClient.client
      .db(process.env.MONGODB_DATABASE_NAME)
      .dropDatabase();
    await MongoClient.client.close();
  });

  it('Should not be possible to create a new user when passing a numeral character in the fullname field', async () => {
    const response = await request(app).post('/users').send({
      fullName: 123456,
      email: 'gmartins@hotmail.com',
      phone: '11982511217'
    });

    expect(response.text).toBe('O campo fullName é do tipo texto!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user, when the fullname field has less than 6 characters', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Lucas',
      email: 'gmartins@hotmail.com',
      phone: '11982511217'
    });

    expect(response.text).toBe(
      'O campo fullName deve conter pelo menos 6 caracteres!'
    );
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when the fullName field has more than 120 characters', async () => {
    const response = await request(app).post('/users').send({
      fullName:
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
      email: 'gmartins@hotmail.com',
      phone: '11982511217'
    });

    expect(response.text).toBe(
      'O campo fullName deve conter no maximo 120 caracteres!'
    );
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when the fullName field is not provided', async () => {
    const response = await request(app).post('/users').send({
      email: 'gmartins@hotmail.com',
      phone: '11982511217'
    });

    expect(response.text).toBe('O campo fullName é um campo obrigatório!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when passing a numeral character in the email field', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 123456,
      phone: '11982511217'
    });

    expect(response.text).toBe('O campo email é do tipo texto!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when the email field must contain a valid format.', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 'ga@.com',
      phone: '11982511217'
    });

    expect(response.text).toBe(
      'O campo email deve conter um formato valido. Ex: email@dominio.com'
    );
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when the email field is not provided', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      phone: '11982511217'
    });

    expect(response.text).toBe('O campo email é um campo obrigatório!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when the phone field is not provided', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 'gmartins@hotmail.com'
    });

    expect(response.text).toBe('O campo phone é um campo obrigatório!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when passing a numeral type caracters in the phone field', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 'gmartins@hotmail.com',
      phone: 11982511217
    });

    expect(response.text).toBe('O campo phone é do tipo texto!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when passing a letters in the phone field', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 'gmartins@hotmail.com',
      phone: 'AAAA11982511217'
    });

    expect(response.text).toBe('O campo phone deve conter apenas digitos!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user, when the phone field has less than 10 characters', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 'gmartins@hotmail.com',
      phone: '119825112'
    });

    expect(response.text).toBe(
      'O campo phone deve conter pelo menos 10 caracteres!'
    );
    expect(response.status).toBe(400);
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 'gmartins@hotmail.com',
      phone: '11982511217'
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create an existing user', async () => {
    await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 'gmartins@hotmail.com',
      phone: '11982511217'
    });

    const response = await request(app).post('/users').send({
      fullName: 'Gabriel Martins',
      email: 'gmartins@hotmail.com',
      phone: '11982511217'
    });

    expect(response.status).toBe(401);
  });
});

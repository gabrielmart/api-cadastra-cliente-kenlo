import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    numerico(): StringSchema;
  }
}

yup.addMethod<yup.StringSchema>(yup.string, 'numerico', function () {
  return this.test('numerico', function (value) {
    const { path, createError } = this;
    const regex = /^\d+$/;

    if (!regex.test(value!)) {
      return createError({
        path,
        message: `O campo ${this.path} deve conter apenas digitos!`
      });
    }

    return true;
  });
});

const CreateUserSchema = yup.object({
  fullName: yup
    .string()
    .typeError('O campo fullName é do tipo texto!')
    .min(6, 'O campo fullName deve conter pelo menos 6 caracteres!')
    .max(120, 'O campo fullName deve conter no maximo 120 caracteres!')
    .required('O campo fullName é um campo obrigatório!'),
  email: yup
    .string()
    .typeError('O campo email é do tipo texto!')
    .email('O campo email deve conter um formato valido. Ex: email@dominio.com')
    .required('O campo email é um campo obrigatório!'),
  phone: yup
    .string()
    .required('O campo phone é um campo obrigatório!')
    .typeError('O campo phone é do tipo texto!')
    .numerico()
    .min(10, 'O campo phone deve conter pelo menos 10 caracteres!')
});

export { CreateUserSchema };

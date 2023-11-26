import { app } from './app';
import { MongoClient } from './database/mongoClient';

const PORT = process.env.PORT;

const main = async () => {
  await MongoClient.connect();

  app.listen(PORT, () => {
    console.log(`Servidor iniciado - API Cadastra cliente Kenlo`);
  });
};

main();

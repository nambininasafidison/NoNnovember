import Server from './server';
import dotenv from 'dotenv';
dotenv.config();
const server = new Server();
server.start(3000);


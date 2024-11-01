import express from 'express';
import { signinController, signupController } from '../controllers/auth.controller';


const authRoutes = express.Router();

authRoutes.post('/signup' , signupController);
authRoutes.post('/signin' , signinController);

export default authRoutes;
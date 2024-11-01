import { Request , Response } from 'express';
import  express from 'express';
import { test } from '../controllers/user.controller';


const userRoutes = express.Router();

userRoutes.get('/' , test);

export default userRoutes;
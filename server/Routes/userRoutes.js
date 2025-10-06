import express from 'express';
import { RegisterUser,AuthUser } from '../Controllers/userControllers.js';

const User_Router = express.Router();

User_Router.post("/register", RegisterUser);
User_Router.post("/login", AuthUser);


export default User_Router;


import express from 'express';
import { RegisterUser,AuthUser, Logout_user } from '../Controllers/userControllers.js';

const User_Router = express.Router();

User_Router.post("/register", RegisterUser);
User_Router.post("/login", AuthUser);
User_Router.post("/logout", Logout_user );


export default User_Router;


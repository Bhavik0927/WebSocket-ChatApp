import express from 'express';
import { RegisterUser,AuthUser, Logout_user, All_users } from '../Controllers/userControllers.js';
import { Protect } from '../middlewares/AuthMiddleware.js';

const User_Router = express.Router();

User_Router.post("/register", RegisterUser);
User_Router.post("/login", AuthUser);
User_Router.post("/logout",Protect, Logout_user );

User_Router.get("/",Protect, All_users);


export default User_Router;


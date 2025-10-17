import express from 'express';
import { Protect } from '../middlewares/AuthMiddleware.js';
import { accessChat, fetchChat } from '../Controllers/chatController.js';

const chat_router = express.Router();

chat_router.post('/',Protect, accessChat);
chat_router.get('/', fetchChat);

// chat_router.post('/group', Protect, createGroupChat);
// chat_router.put('/rename', Protect, renameGroup);
// chat_router.put('/groupremove', Protect, removeFromGroup);
// chat_router.put('/groupadd', Protect, addToGroup);

export default chat_router;
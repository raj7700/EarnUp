import express from 'express';

import {login,logout,register,otpSend,otpVerify } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout',logout);
router.post('/otpSend',otpSend);
router.post('/otpVerify',otpVerify);


export default router;
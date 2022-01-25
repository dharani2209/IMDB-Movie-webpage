import express from "express";
import { getUsers,getMovie,getWatchlist, Register, Login, Logout,Like } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/getmovie',getMovie);
router.get('/getwatchlist',getWatchlist);
router.put('/like',Like);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
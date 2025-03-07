import express, {Request, Response} from 'express';
import { currentUser, requireAuth } from '@uchihatickets/common';


const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});


export { router as currentUserRouter };

import express from 'express';
import controller from '../controllers/home-page';

const router = express.Router();

router.route('/')
  .get(controller.getHomePage)

export default router;

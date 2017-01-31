import express from 'express';
import controller from '../controllers/tweets';

const router = express.Router();

router.route('/tweets')
  .get(controller.getTweets)
  .post(controller.postTweet);

export default router;

import core from '../cores/tweets';
import credentials from '../config/credentials';
import { Twitter } from 'twitter-node-client';

const client = new Twitter(credentials.twitter);

const Controller = {
    getTweets(req, res, next) {
       const dependencies = {
           req,
           res,
           next,
           client
       };

       core.getTweets(dependencies);
    },

    postTweet(req, res, next) {
        const dependencies = {
            req,
            res,
            next,
            client
        };

        core.postTweet(dependencies);
    }
}

export default Controller;
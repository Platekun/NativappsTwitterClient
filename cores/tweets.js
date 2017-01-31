const Core = {
    getTweets({req, res, next, client}) {
        var params = {
            screen_name: 'NativappsBot'
        };

        client.getUserTimeline(
            params,
            (err, response, body) => res.json({error: err.message, stack: err.stack}),
            data => res.json(data)
        );
    },

    postTweet({ req, res, next, client }) {
        const { status } = req.body;
        
        client.postTweet(
            {status}, 
            (err, response, body) => res.json({error: err.message, stack: err.stack}),
            data => res.json(data)
        );
    } 
};

export default Core;
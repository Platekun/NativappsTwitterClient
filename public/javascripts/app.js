function buildTemplate() {
    const tweetTemplate = document.querySelector("#tweet-template");
    const source = tweetTemplate.innerHTML;
    return Handlebars.compile(source);
}

function buildListNode(data) {
    const node = document.createElement('li');
    node.innerHTML = data;
    return node;
} 

function setupTweeter() {
    document.querySelector('.tweet-form')
        .addEventListener('submit', postTweet);
}

function postTweet(evt) {
    evt.preventDefault();

    const status = {
        status: document.querySelector('.tweet-form textarea').value
    };
    
    ajax('POST', '/tweets', status)
        .then(addTweet)
        .catch(err => console.error(err.message));
}

function addTweet(tweet) {
    const tweetTemplate = buildTemplate();
    
    const tweetList = document.querySelector('.tweets-list ul');
    const tweetHtmlData = tweetTemplate(tweet);
    const tweetNode = document.createElement('li');
    tweetNode.innerHTML = tweetHtmlData;

    const listLength = tweetList.childNodes.length;
    if(!listLength) {
        tweetList.appendChild(tweetNode);
    } else {
        const firstChild = document.querySelector('.tweets-list ul li:first-child');
        tweetList.insertBefore(tweetNode, firstChild);
    }

    document.querySelector('.tweet-form textarea').innerHTML = '';
}

function getTweets() {
    ajax('GET', '/tweets')
        .then(buildTweetsList)
        .catch(err => console.error(err.message));
}

function buildTweetsList(tweets) {
    const tweetTemplate = buildTemplate();
    const tweetList = document.querySelector('.tweets-list ul');

    tweets
        .map(tweetData => tweetTemplate(tweetData))
        .map(tweetHtmlData => buildListNode(tweetHtmlData))
        .forEach(tweetNode => tweetList.appendChild(tweetNode));
}

function ajax(method, url, data) {
    return new Promise(function(resolve, reject) {
        const async = true;
        const req = new XMLHttpRequest();
        
        req.open(method, url, async);
        
        if(method === 'POST') {
            req.setRequestHeader("Content-type", "application/json");
        }
        
        if(data) {
            req.send(JSON.stringify(data));
        } else {
            req.send(null);
        }
        
        req.onreadystatechange = () => {
            const DONE = 4; 
            const OK = 200;

            if (req.readyState === DONE) {
                if (req.status === OK) {
                    resolve(JSON.parse(JSON.parse(req.responseText)));
                } else {
                    reject(new Error(`An error ocurred: ${req.status}`));
                }
            };
        }
    });
}

window.onload = () => {
    setupTweeter();
    getTweets();
};
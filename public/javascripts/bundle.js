'use strict';

function buildTemplate() {
    var tweetTemplate = document.querySelector("#tweet-template");
    var source = tweetTemplate.innerHTML;
    return Handlebars.compile(source);
}

function buildListNode(data) {
    var node = document.createElement('li');
    node.innerHTML = data;
    return node;
}

function setupTweeter() {
    document.querySelector('.tweet-form').addEventListener('submit', postTweet);
}

function postTweet(evt) {
    evt.preventDefault();

    var status = {
        status: document.querySelector('.tweet-form textarea').value
    };

    ajax('POST', '/tweets', status).then(addTweet).catch(function (err) {
        return console.error(err.message);
    });
}

function addTweet(tweet) {
    var tweetTemplate = buildTemplate();

    var tweetList = document.querySelector('.tweets-list ul');
    var tweetHtmlData = tweetTemplate(tweet);
    var tweetNode = document.createElement('li');
    tweetNode.innerHTML = tweetHtmlData;

    var listLength = tweetList.childNodes.length;
    if (!listLength) {
        tweetList.appendChild(tweetNode);
    } else {
        var firstChild = document.querySelector('.tweets-list ul li:first-child');
        tweetList.insertBefore(tweetNode, firstChild);
    }

    document.querySelector('.tweet-form textarea').value = '';
}

function getTweets() {
    ajax('GET', '/tweets').then(buildTweetsList).catch(function (err) {
        return console.error(err.message);
    });
}

function buildTweetsList(tweets) {
    var tweetTemplate = buildTemplate();
    var tweetList = document.querySelector('.tweets-list ul');

    tweets.map(function (tweetData) {
        return tweetTemplate(tweetData);
    }).map(function (tweetHtmlData) {
        return buildListNode(tweetHtmlData);
    }).forEach(function (tweetNode) {
        return tweetList.appendChild(tweetNode);
    });
}

function ajax(method, url, data) {
    return new Promise(function (resolve, reject) {
        var async = true;
        var req = new XMLHttpRequest();

        req.open(method, url, async);

        if (method === 'POST') {
            req.setRequestHeader("Content-type", "application/json");
        }

        if (data) {
            req.send(JSON.stringify(data));
        } else {
            req.send(null);
        }

        req.onreadystatechange = function () {
            var DONE = 4;
            var OK = 200;

            if (req.readyState === DONE) {
                if (req.status === OK) {
                    resolve(JSON.parse(JSON.parse(req.responseText)));
                } else {
                    reject(new Error('An error ocurred: ' + req.status));
                }
            };
        };
    });
}

window.onload = function () {
    setupTweeter();
    getTweets();
};

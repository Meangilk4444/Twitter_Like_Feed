var tweets = [];
let tweetIDList = [];

class Tweet {
    constructor(text, id, created_at) {
        this.text = text;
        this.id = id;
        this.created_at = created_at;
    }
}

window.addEventListener('load', (event) => {
    console.log("Loaded");
    getTweets();
    setInterval(getTweets, 5000);
    //clearContainer = document.getElementById('tweet-container');
    //clearContainer = '';
    
    
    

    //remove duplicates
    /*var i = 0; //use to reiterate through loop
    var tweetID = []; //this array is for the tweets we've already seen
    console.log(tweets.length);
    while(i < tweets.length) {
        
        if(!tweetID.includes(tweets[i].id)) { //check to see if there is a tweet with that id in tweet ID
            //if no tweet with that id in the tweetID then we add it
            tweetID.push(tweets[i].id);
            console.log(tweets[i].id);
        }
        else {
            //if the tweet is there then we remove it
            //splice (index where to start, how many items to remove, items to add)
            tweets.splice(i,1); //remove at index i, only remove one item, no item to add
        }
        i++; //increase index after checking the current index
    }
    console.log("end");
    //console.log(tweets.id);
    
    //sort
    //const sortedResult = tweets.sort();
   // console.log(sortedResult); */
    
})

function getTweets() {
    fetch ('http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather').then(function (response) {
        return response.json();
    }).then(function(data) {
        for (let i = 0; Object.keys(data.statuses).length; i++) {
            if (data.statuses[i] != null && data.statuses[i].text != null && data.statuses[i].id != null && data.statuses[i].created_at) {
                let tweet = new Tweet(data.statuses[i].text, data.statuses[i].id, data.statuses[i].created_at);

                if (!tweetIDList.includes(tweet.id)) {
                    tweets.push(tweet);
                    tweetIDList.push(tweet.id);
                }
            }

            if (i == 10) {
                break;
            }
        }

        updateFeed();
    }).catch(function(err) {
        console.warn("There was an error fetching the tweets.", err);
    });
}

function updateFeed() {
    console.log("constructing feed");
    var tweetContainer = document.getElementById('tweet-container'); 
    const tweetList = document.createElement("ul");

    if(tweetContainer != null){
        tweetContainer.appendChild(tweetList);
    }

    tweets.forEach(tweetObject => {
        // create a container for individual tweet
        const tweet = document.createElement("li");

        // e.g. create a div holding tweet content
        const tweetContent = document.createElement("div");
        // create a text node "safely" with HTML characters escaped
        // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
        const tweetText = document.createTextNode(tweetObject.text);
        // append the text node to the div
        tweetContent.appendChild(tweetText);

        // you may want to put more stuff here like time, username...
        tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
        tweetList.appendChild(tweet);
    });
}

/**
 * Removes all existing tweets from tweetList and then append all tweets back in
 *
 * @param {Array<Object>} tweets - A list of tweets
 * @returns None, the tweets will be renewed
 */
/*
function refreshTweets(tweets) {
    // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
    // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
    /*while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }*/
    //clearContainer = document.getElementById('container');
    //clearContainer = '';

    // create an unordered list to hold the tweets
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
    //const tweetList = document.createElement("ul");
    // append the tweetList to the tweetContainer
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
    //tweetContainer.appendChild(tweetList);
    //tweetContainer.appendChild(document.createElement("ul"));
    // all tweet objects (no duplicates) stored in tweets variable
    //removeDuplicates();
    //console.log("noerrors");
    // filter on search text
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
    //const filteredResult = tweets.filter(...);
    // sort by date
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    //const sortedResult = filteredResult.sort(...);

    // execute the arrow function for each tweet
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
    //sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
    //const tweet = document.createElement("li");

        // e.g. create a div holding tweet content
    //const tweetContent = document.createElement("div");
        // create a text node "safely" with HTML characters escaped
        // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
    //const tweetText = document.createTextNode(tweetObject.text);
        // append the text node to the div
    //tweetContent.appendChild(tweetText);

        // you may want to put more stuff here like time, username...
    //tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
    //tweetList.appendChild(tweet);
    //});
     
//}*/
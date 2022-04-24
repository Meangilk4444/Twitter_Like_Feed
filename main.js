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

    //sort by date
    tweets.sort(function compareDates(a,b){
        if(a.created_at > b.created_at) return 1;
        if(a.created_at < b.created_at) return -1;
        return 0;
    });

    var j = 0;
    while( j < tweets.length)
    {
        console.log(tweets[j].created_at);
        j++;
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

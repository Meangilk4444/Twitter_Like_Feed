var tweets = [];

class Tweet {
    constructor(text, id, created_at) {
        this.text = text;
        this.id = id;
        this.created_at = created_at;
    }
}

window.addEventListener('load', (event) => {
    setInterval(getTweets, 5000);
})

function getTweets() {
    fetch ('http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather').then(function (response) {
        return response.json();
    }).then(function(data) {
        for (let i = 0; Object.keys(data.statuses).length; i++) {
            if (data.statuses[i] != null && data.statuses[i].text != null && data.statuses[i].id != null && data.statuses[i].created_at) {
                let tweet = new Tweet(data.statuses[i].text, data.statuses[i].id, data.statuses[i].created_at);
                tweets.push(tweet);

                if (tweets.length == 10) {
                    break;
                }
                //console.log(tweets[i].id);
            }
        }
    var tweetContainer = document.getElementById('tweet-container'); 
    const tweetList = document.createElement("ul");

    if(tweetContainer != null){
        tweetContainer.appendChild(tweetList);
        console.log("appended");
    }
        //console.log(tweets);
    removeDuplicates();
    console.log(tweets.length);

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

    }).catch(function(err) {
        console.warn("There was an error fetching the tweets.", err);
    });
}

function removeDuplicates() {
    var i = 0; //use to reiterate through loop
    var tweetID = []; //this array is for the tweets we've already seen
    while(i < tweets.length) {
        
        if(!tweetID.includes(tweets[i].id)) { //check to see if there is a tweet with that id in tweet ID
            //if no tweet with that id in the tweetID then we add it
            tweetID.push(tweets[i].id);
            
        }
        else {
            //if the tweet is there then we remove it
            //splice (index where to start, how many items to remove, items to add)
            tweets.splice(i,1); //remove at index i, only remove one item, no item to add
        }
        i++; //increase index after checking the current index
    }
}


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
            }

            console.log(tweets);
            //filtering stuff here
        }

        console.log(tweets);
    }).catch(function(err) {
        console.warn("There was an error fetching the tweets.", err);
    });
}

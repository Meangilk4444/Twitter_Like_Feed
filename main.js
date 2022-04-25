var unfilteredTweets = [];
var filteredTweets = [];
let tweetIDList = [];

let paused = false;
let searching = false;
let searchQuery = "";

var tweetList;

class Tweet {
    constructor(text, id, created_at, name, username, profile_picture_url) {
        this.text = text;
        this.id = id;
        this.created_at = created_at;
        this.name = name;
        this.username = username;
        this.profile_picture_url = profile_picture_url; 
    }
}

window.addEventListener('load', (event) => {
    console.log("Loaded");
    document.getElementById("searchBar").addEventListener("input", handleSearch);
    document.getElementById("pause").addEventListener("change", onChecked);
    getTweets();
    setInterval(getTweets, 5000);
})

function onChecked(checkbox) {
    if (checkbox.target.checked) {
        paused = true;
    }
    else {
        paused = false;
    }
}

const handleSearch = event => {
    searchQuery = event.target.value.trim().toLowerCase();

    filteredTweets.length = 0;
    initializeHTML(true);

    if (searchQuery.length == 0) {
        searching = false;
        updateFeed(unfilteredTweets);
    }
    else {
        searching = true;

        unfilteredTweets.forEach(element => {
            if (element.text.trim().toLowerCase().includes(searchQuery)) {
                filteredTweets.push(element);
            }
        });

        updateFeed(filteredTweets);
    }
}

function getTweets() {
    if (!paused) {
        fetch ('http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather').then(function (response) {
            return response.json();
        }).then(function(data) {
            for (let i = 0; Object.keys(data.statuses).length; i++) {
                if (data.statuses[i] != null && data.statuses[i].text != null && data.statuses[i].id != null && data.statuses[i].created_at && data.statuses[i].user.name != null && data.statuses[i].user.screen_name != null && data.statuses[i].user.profile_image_url != null) {
                    let tweet = new Tweet(data.statuses[i].text, data.statuses[i].id, data.statuses[i].created_at, data.statuses[i].user.name, data.statuses[i].user.screen_name, data.statuses[i].user.profile_image_url);

                    if (!tweetIDList.includes(tweet.id)) {
                        unfilteredTweets.push(tweet);
                        tweetIDList.push(tweet.id);
                    }
                }

                if (i == 10) {
                    break;
                }
            }

            if (searching) {
                unfilteredTweets.forEach(element => {
                    if (element.text.trim().toLowerCase().includes(searchQuery)) {
                        filteredTweets.push(element);
                    }
                });

                updateFeed(filteredTweets);
            }
            else {
                updateFeed(unfilteredTweets);
            }
        }).catch(function(err) {
            console.warn("There was an error fetching the tweets.", err);
        });
    }
}

function updateFeed(tweets) {
    initializeHTML(false);

    //sort by date
    tweets.sort(function compareDates(a,b){
        if(a.created_at > b.created_at) return 1;
        if(a.created_at < b.created_at) return -1;
        return 0;
    });

    tweets.forEach(tweetObject => {
        let postContainer = document.createElement("div");
        postContainer.classList.add('post');
        postContainer.classList.add('d-flex');

        let profilePicture = document.createElement("img");
        profilePicture.classList.add("postProfilePicture");
        profilePicture.src = tweetObject.profile_picture_url;
        profilePicture.alt = "Profile Picture";

        let postContent = document.createElement("div");
        postContent.classList.add('postContent');
        postContent.classList.add('d-flex');
        postContent.classList.add('flex-column');

        let postProfileInformation = document.createElement("div");
        postProfileInformation.classList.add("postProfileInformation");
        postProfileInformation.classList.add("d-flex");

        let name = document.createElement("p");
        name.innerHTML = `<b>${tweetObject.name}</b>`;

        let postUsername = document.createElement("p");
        postUsername.classList.add("postUsername");
        postUsername.innerHTML = `@${tweetObject.username} ${moment(tweetObject.created_at).utc().format('MM/DD/YY')}`;

        let postText = document.createElement("p");
        postText.innerHTML = `${tweetObject.text}`

        postContainer.appendChild(profilePicture);

        postProfileInformation.appendChild(name);
        postProfileInformation.appendChild(postUsername);

        postContent.appendChild(postProfileInformation);
        postContent.appendChild(postText);

        postContainer.appendChild(postContent);
        tweetList.appendChild(postContainer);
    });
}

function initializeHTML(reset) {
    var tweetContainer = document.getElementById('centerColumn'); 
    
    if (reset) {
        tweetContainer.innerText = '';
    }

    tweetList = document.createElement("div");

    if(tweetContainer != null){
        tweetContainer.appendChild(tweetList);
    }
}

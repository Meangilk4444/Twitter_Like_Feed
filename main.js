window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    posts = fetchPosts("https://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather");

    console.log(posts);
})

async function fetchPosts (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
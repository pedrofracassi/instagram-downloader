var instagram_urls = [
    "http://instagram.com/",
    "https://instagram.com/",
    "instagram.com/",
    "www.instagram.com/",
];

function startFetching() {
    var linkToMedia = document.getElementById('linkToMedia').value;
    if (!linkToMedia.endsWith('?__a=1')) {
        linkToMedia = linkToMedia + "?__a=1"
    }
    if (isInstagramUrl(linkToMedia)) {
        // Start fetching stuff
    } else {
        alert('The URL you entered isn\'t an instagram URL');
    }
}

function isInstagramUrl(url) {
    for (i = 0; i < instagram_urls.length; i++) {
        if (url.startsWith(instagram_urls[i])) {
            return true;
        }
    }
    return false;
}
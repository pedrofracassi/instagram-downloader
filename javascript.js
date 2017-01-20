var instagramurls = [
    "http://instagram.com",
    "https://instagram.com",
    "https://www.instagram.com",
    "http://www.instagram.com",
    "http://instagram.com",
    "instagram.com",
    "www.instagram.com"
]

function startFetching() {
    var value = document.getElementById('input').value;
    if (isInstagramUrl(value)) {
        alert('The URL you entered is valid! :D');
    } else {
        alert('The URL you entered is not an instagram URL.');
    }
}

function isInstagramUrl(url) {
    for (i = 0; i < instagramurls.length; i++) {
        if (url.startsWith(instagramurls[i])) {
            return true;
        }
    }
    return false;
}

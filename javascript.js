var instagramurls = [
    "http://instagram.com",
    "https://instagram.com",
    "https://www.instagram.com",
    "http://www.instagram.com",
    "http://instagram.com",
    "instagram.com",
    "www.instagram.com"
]

function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200)
            callback(request.responseText);
            else {
                callback("nex");
            }
        }
    };
    request.open('GET', url);
    request.send();
}

function isInstagramUrl(url) {
    for (i = 0; i < instagramurls.length; i++) {
        if (url.startsWith(instagramurls[i])) {
            return true;
        }
    }
    return false;
}

function startFetching() {
    var value = document.getElementById('input').value;
    if (isInstagramUrl(value)) {
        // Adds ?__a=1 to the end of the URL, so it returns JSON.
        if (!value.endsWith('?__a=1')) {
            value = value + "?__a=1";
        }

        var query = "https://query.yahooapis.com/v1/public/yql" +
        "?q=select%20*%20from%20html%20where%20url%3D\'" + encodeURIComponent(value) + "\'" +
        "&format=json";

        console.log(query);

        // I'm using YQL because instagram doesen't allow Cross-Domain requests.
        getText(query, function (data) {
            var yahoo_json = JSON.parse(data);
            var ig_json = JSON.parse(yahoo_json.query.results.body);
            if (ig_json.user) {
                // TODO: Add profile picture download
                console.log('User!');

            } else if (ig_json.media) {
                // TODO: Add media download
                if (ig_json.media.is_video) {
                    console.log('Video!');
                } else {
                    console.log('Photo');
                }
            }
        })
    } else {
        // TODO: Handle this
        // URL entered is not from instagram
    }
}

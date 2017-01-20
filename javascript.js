/**
* Array with a list of valid url starts for instagram
* @type {Array}
*/
var instagramurls = [
    "http://instagram.com",
    "https://instagram.com",
    "https://www.instagram.com",
    "http://www.instagram.com",
    "http://instagram.com",
    "instagram.com",
    "www.instagram.com"
]

/**
* Gets text from the web (or a local file if you want to)
* @param  {string}   url      Url to be downloaded
* @param  {Function} callback Function to be called after the text is downloaded
*/
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

/**
* Checks if the given string is an instagram url
* @param  {string}   url The string to be checked
* @return {Boolean}      True if the string is an instagram url
*/
function isInstagramUrl(url) {
    for (i = 0; i < instagramurls.length; i++) {
        if (url.startsWith(instagramurls[i])) {
            return true;
        }
    }
    return false;
}

/**
* Shows an error inside #mainPanel
* @param  {string} title Bold error text
* @param  {string} text  Main error text
*/
function showError(title, text) {
    var div = document.createElement('div');
    div.setAttribute('class', 'alert alert-danger');
    div.setAttribute('role', 'alert');
    div.setAttribute('id', 'errorAlert');
    div.innerHTML = '<strong>Oops!</strong> This isn\'t an instagram link.';
    document.getElementById('mainPanel').append(div);
}

/**
* Starts the process of getting information about the inputted link
*/
function startFetching() {
    var value = document.getElementById('input').value;
    document.getElementById('mainPanel').innerHTML = "";
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
            if (yahoo_json.query.results.body) {
                var ig_json = JSON.parse(yahoo_json.query.results.body);
                if (ig_json.user) {
                    getText('card.html', function(data) {
                        var div = document.createElement('div');
                        div.innerHTML = data;
                        div.getElementsByClassName('card-title')[0].innerHTML = ig_json.user.username;
                        div.getElementsByClassName('card-text')[0].innerHTML = "Click the button below to download the user's profile picture.";
                        div.getElementsByClassName('card-img-top')[0].setAttribute('src', ig_json.user.profile_pic_url);
                        div.getElementsByClassName('btn')[0].setAttribute('href', ig_json.user.profile_pic_url_hd.replace('s320x320', 's1080x1080'));
                        div.getElementsByClassName('btn')[0].setAttribute('download', ig_json.user.username + "_1080");
                        $('#mainPanel').append(div);
                    });
                } else if (ig_json.media) {
                    if (ig_json.media.is_video) {
                        // Thats a video!
                    } else {
                        // Thats a photo!
                    }
                } else {
                    showError('Thats bad...', 'We couldn\'t recognize what this link was. Please check' +
                    ' if the account that this link belongs to isn\'t private');
                }
            } else {
                showError('Thats bad...', 'We couldn\'t recognize what this link was. Please check' +
                ' if the account that this link belongs to isn\'t private');
            }
        })
    } else {
        showError('Oops', 'This isn\'t an instagram link.');
    }
}

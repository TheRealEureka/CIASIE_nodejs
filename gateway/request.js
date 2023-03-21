const API_ORDER = "http://api_order:3000/";
const API_AUTH = "http://api_auth:3000/";
const API_SANDWICH = "http://api_order:3000/";

async function send(url, method = 'GET', body = {}, token = null) {
    let headers = {
        'Content-Type': 'application/json'
    };
    if(token !== null) headers.authorization = token;

    let options = {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }

    if(method === 'GET') delete(options.body);
    try {
        return await fetch(url, options).then(response => {
            return response.json();
        });
    } catch (e) {
        console.log(e);
        return {error: e}
    }
}
checkAuthentification =  function (token) {
    let req = send(API_AUTH+'validate', 'GET', {}, token);
    return req.then((data) => {
        return data.iss !== undefined && data.iss === "auth";
    })
}


transformQuery = function (url, query) {
    let newUrl = url + "?";
    for (let key in query) {
        newUrl += key + "=" + query[key] + "&";
    }
    console.log(newUrl)
    return newUrl;
}
module.exports = {send, API_AUTH, API_ORDER, API_SANDWICH, checkAuthentification, transformQuery};
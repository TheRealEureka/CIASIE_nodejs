
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
    console.log(url)
    console.log(options);
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
module.exports = {send};


async function send(url, method = 'GET', body = {}, headers = {}) {
    headers['Content-Type'] = 'application/json';
    let options = {
        method: method,
        body: body,
        headers: headers,
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
module.exports = {send};
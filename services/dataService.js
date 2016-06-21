var request = require('request');



var baseUrl = "https://swapi.co/";


exports.invoke = function(options, cb) {
    var http = options.http;
    var cookies = http.req.cookies;

    var client_cookie = (http && http.req && http.req.cookies && http.req.cookies['sails.sid']) ? cookies['sails.sid'] : '';
    var cookie = 'sails.sid='+client_cookie;

    

    // An object of options to indicate where to post to
    var req_options = {
        url: baseUrl + options.url,
        method: options.method,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie
        },
    };

    if(options.method == 'POST' || options.method == 'PUT'){
        if(options.body){
            req_options.body = JSON.stringify(options.body);
        }
    }
    var callback = function(error, response, body) {
        if(!error){
            if(response.headers['set-cookie'] && response.headers['set-cookie'].length == 1){
                var cookie = response.headers['set-cookie'][0];
                var real = cookie.substring(cookie.indexOf('=')+1, cookie.indexOf(';'));
                options.http.res.cookie('sails.sid', real);
            }
        }

        if(error){
            console.log('error in requesting API');
            console.log(error);
            http.res.json(403, {msg: 'API seems to be having an issue'});
        }else if (response.statusCode == 200) {
            var responseBody;
            try {
                responseBody = JSON.parse(body);
            } catch(e) {
                responseBody = body;
            }
            cb(null, responseBody);
        }else if (response.statusCode == 403 && http.req.xhr) {
            http.res.json(403, {msg: 'Not Authenticated'});
        }else if (response.statusCode == 403 && http.req.path == '/user/login') {
            cb(JSON.parse(response.body));
        }else if (response.statusCode == 403) {
            http.res.redirect('/user/login');
        }else if(response.statusCode == 404){
            console.log('404 in dataservice');
            http.res.json(404, {msg: 'Not Found', url: options.url});
        }else if(response.statusCode == 500){
            console.log('500 in dataservice');
            http.res.json(500, {msg: 'Unable to process json', url: options.url});
        }else if(response.statusCode == 204) {
            console.log("Null response from server");
            cb(null, null)
        }else{
            console.log(response)
            http.res.json(response.statusCode, {msg: response.statusMessage, url: options.url});
        }

    };
    // Set up the request
    var req = request(req_options, callback);
}

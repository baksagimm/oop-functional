const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url);

    // file path
    let urlpath = `.${parsedUrl.pathname}`;
    
    if (urlpath === './am-i-a-file.exe') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(`
<!DOCTYPE html>
<body>
    <h1>Hello :).</h1>
    <p>I'm a server. I can respond however I want.</p>
</body>
`);
    }

    else if (urlpath === './text-index') {
        fs.readFile('./index.html', function (err, data) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end(data);
        });
    }

    else if (urlpath === './download-index') {
        fs.readFile('./index.html', function (err, data) {
            res.writeHead(200, { 'content-type': 'text/html', 'content-disposition': 'attachment', 'filename': "your_index.html" });
            res.end(data);
        });
    }

    else {
        if (urlpath === './') {
            urlpath += 'index.html';
        }
        else if (urlpath === './another-index') {
            urlpath = './index.html';
        }

        // file extension
        let ext = path.parse(urlpath).ext;

        fs.stat(urlpath, (err, stats) => {
            if (err) {
                res.statusCode = 404;
                res.end(`file not found :(`);
                return;
            }

            // read file from file system
            fs.readFile(urlpath, function (err, data) {
                if (err) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(`read error`);
                        return;
                    }
                }

                let MIME = {
                    '.html': 'text/html',
                    '.js': 'text/javascript',
                };
                res.writeHead(200, { 'content-type': MIME[ext] || 'text/plain' });
                res.end(data);
            });
        });
    }
}).listen(8080);

console.log('== server running on :8080 ==');
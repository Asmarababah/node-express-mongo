const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log("Request is made");
    // console.log(request);
    console.log(request.url)
    //  console.log(request.method)
    response.setHeader('Content-Type', 'Text/HTML');
    //response.write('<h1> Response </h1>');

    // check the request url
    // / -> index.html
    // /about-> about.html


    // path+='index.html'; // ./views/index.html
    // fs.readFile('./views/index.html', (error, data) => {
    //     if (error) {
    //         // console.log(err);
    //         response.end();
    //     } else {
    //         response.write(data);
    //         response.end();
    //     }
    // })

    if (request.url == '/') {
        fs.readFile('./views/index.html', (error, data) => {
            if (error) {
                // console.log(err);
                response.end();
            } else {
                response.statusCode = 200;
                response.write(data);

                response.end();

            }
        })
    } else if (request.url == '/about') {

        fs.readFile('./views/about.html', (error, data) => {
            if (error) {
                // console.log(err);
                response.end();
            } else {
                response.statusCode = 200;
                response.write(data);

                response.end();

            }
        })
    } else if (request.url == "/profile") {
        fs.readFile('./views/profile.html', (error, data) => {
            if (error) {
                // console.log(err);
                response.end();
            } else {
                response.statusCode = 200;
                response.write(data);

                response.end();

            }
        })
    } else {
        fs.readFile('./views/notfound.html', (error, data) => {
            if (error) {
                // console.log(err);
                response.statusCode = 404;
                response.end();
            } else {
                response.statusCode = 404;
                response.write(data);
                response.end();

            }
        })

    }
    // fs.readFile(path, (error, data) => {
    //     if (error) {
    //         // console.log(err);
    //         response.end();
    //     } else {
    //         response.write(data);
    //         response.end();
    //     }
    // })
})

// localhost:8080
// 127.0.0.1
server.listen(8080, 'localhost', () => {
    console.log("listening for requests using port 8080")
})

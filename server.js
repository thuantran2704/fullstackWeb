const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    console.log(req.url, req.method);
    let path = './html/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/generic':
            res.statusCode = 200;
            path += 'generic.html';
            break;
        case '/about-me':
            res.statusCode = 301;
            //301 is wrong site
            res.setHeader('location', '/generic');
            res.end();
            
        default:
            res.statusCode = 404;
            path += '404.html';
            break;
    }
    fs.readFile(path, (err,data)=>{
        if(err){
            console.log(err);
            res.end();
        } else {
            console.log('made a page');
            res.write(data);
            res.end();
        }
    })

});

server.listen(3000, 'localhost',() =>{
    console.log('listening for request on port 3000');
});
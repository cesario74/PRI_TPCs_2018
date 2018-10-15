var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url,true);

    switch (path.pathname) {
        case '/':
            fs.readFile('website/index.html', function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/obra':
            fs.readFile('website/html/obra'+path.query.id+'.html', function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("A pagina nao existe - 404");
            response.end();
            break;
    }
});
server.listen(8888, ()=>{
  console.log('Servidor à escuta na porta 8888...')
})
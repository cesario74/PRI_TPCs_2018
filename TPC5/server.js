var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')

var style = /w3\.css/
var index = /index/
var music = /musica/
var dirPath = 'json/'
var fileType = /.*\.json/
var abrir = '{"obras": ['
var fechar = ']}'


http.createServer((req, res)=>{
    var purl = url.parse(req.url, true)
    
    console.log('Recebi um pedido: ' + purl.pathname)

    if(index.test(purl.pathname)){
        fs.readdir('json/',(erro, dados)=>{
            if(!erro){
                var fd = fs.openSync('index.json', 'w')
                var k = 0
                fs.appendFileSync(fd, abrir, 'utf8')
                if(fileType.test(dados[k])){
                    var info = fs.readFileSync(dirPath+dados[k])
                    var myObj = JSON.parse(info)
                    fs.appendFileSync(fd, '{"tipo": "'+myObj.tipo+'", "titulo": "'+myObj.titulo+'", "id": "'+myObj._id+'"}, ','utf8')
                    k++
                }
                for(k; k<dados.length-1; k++){
                    if(fileType.test(dados[k]))
                    {
                        var info = fs.readFileSync(dirPath+dados[k])
                        var myObj = JSON.parse(info)
                        fs.appendFileSync(fd, '{"tipo": "'+myObj.tipo+'", "titulo": "'+myObj.titulo+'", "id": "'+myObj._id+'"}','utf8')
                        if(k+1 != dados.length-1)
                            fs.appendFileSync(fd, ', ','utf8')
                    }
                }
                if(!fileType.test(dados[k]))
                {}
                else
                {
                    var info = fs.readFileSync('json/'+dados[k])
                    var myObj = JSON.parse(info)
                    fs.appendFileSync(fd, ', {"tipo": "'+myObj.tipo+'", "titulo": "'+myObj.titulo+'", "id": "'+myObj._id+'"}','utf8')
                    fs.appendFileSync(fd, fechar, 'utf8')
                    fs.closeSync(fd)
                }
                
                fs.readFile('index.json',(erro,dados)=>{
                    console.log('')
                    if(!erro){
                        var myObj = JSON.parse(dados)
                        res.write(pug.renderFile('index.pug',{ind:myObj}))
                    }else{
                        res.write('<p><b>ERRO: A LER O FICHEIRO INDEX.JSON')
                    }
                    res.end()
                })
            }
        })
    }
    
    else if(style.test(purl.pathname)){
        res.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile('estilo/w3.css', (erro, dados)=>{
            if(!erro){
                res.write(dados)
            }
            else
                res.write('<p><b>ERRO: </b> ' + erro + '</p>')
            res.end()
        })
    }
    else if(music.test(purl.pathname)){
        var ficheiro = purl.pathname.split('/')[2]+'.json'
        console.log('ler ficheiro: '+ficheiro)
        res.writeHead(200, {'Content-type': 'text/html'})
        fs.readFile('json/'+ficheiro, (erro,dados)=>{
            if(!erro){
                var myObj = JSON.parse(dados)
                res.write(pug.renderFile('template.pug', {arq: myObj}))
            }
            else
                res.write('<p><b>Erro:</b> '+erro+'</p>')
            res.end()
        })      
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<p><b>ERRO: </b> ' + purl.pathname + '</p>')
        res.write('<p>Rota desconhecida...</p>')
        res.end()
    }
}).listen(5000, ()=>{
    console.log('Servidor à escuta na porta 5000...')
})
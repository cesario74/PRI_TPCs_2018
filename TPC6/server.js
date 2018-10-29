var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var {parse} = require('querystring') // {parse} é equivalente a usar querystring.parse -> exterioriza o método
var jsonfile = require('jsonfile')

var myBD = "teses.json"

var myServer = http.createServer((req,res)=>{
    var purl = url.parse(req.url,true)
    var query = purl.query // o formato do query é {nome: "...", número: "...", curso: "...", instituição: "...", titulo: "...", data: "...", tipo: "..."}

    console.log('Recebi o pedido: '+req.url)
    console.log('Método: '+req.method)

    if(req.method == 'GET'){
        if(purl.pathname == '/pagina-inicial') {
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.write(pug.renderFile('pagina-inicial.pug'))
            res.end()
        }
        else if(purl.pathname == '/lista-de-teses') {
            jsonfile.readFile(myBD, (erro,teses)=> {
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
                if(!erro) res.write(pug.renderFile('lista-teses.pug', {lista: teses})) //neste caso lista é um array
                else res.write(pug.renderFile('erro.pug',{e: erro})) 
            })
        }
        else if(purl.pathname == '/tese-submetida') {
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.write(pug.renderFile('tese-submetida.pug',{aluno: query}))
            res.end()
        }
        else if(purl.pathname == '/registar-tese') {
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.write(pug.renderFile('registar-tese.pug'))
            res.end()
        }
        else if(purl.pathname == '/w3.css') {
            res.writeHead(200,{'Content-Type':'text/css'})
            fs.readFile('stylesheets/w3.css',(erro,dados)=>{
                if(!erro) res.write(dados)
                else res.write(pug.renderFile('erro.pug',{e: erro})) //o 'e' é o handler de mensagens de erro
                res.end()
            })
        }
        else {
            res.writeHead(501,{'Content-Type':'text/html;charset=utf-8'}) //erros do servidor 500 / erros do cliente 400
            res.end('ERRO: '+purl.pathname+' não está implementado...')
        }
    }
    else if(req.method == 'POST'){
        if(purl.pathname == '/tese-submetida') {
            recuperaInfo(req,resultado=>{
                jsonfile.readFile(myBD,(erro,tesesBD)=> {
                    if(!erro) {
                        tesesBD.push(resultado)
                        console.dir(tesesBD)
                        jsonfile.writeFile(myBD,tesesBD, erro2=> {
                            if(!erro2) console.log('Registo gravado com sucessso.')
                            else console.log('Erro: '+erro2)
                        })
                    }
                    else {
                        console.log ('Erro: '+erro)
                    }
                })
                res.end(pug.renderFile('tese-submetida.pug',{aluno: resultado}))
            }) 
        }
        else {
            res.writeHead(501,{'Content-Type':'text/html;charset=utf-8'}) //erros do servidor 500 / erros do cliente 400
            res.end('ERRO: '+purl.pathname+' não está implementado...')
        }
    }
    else {
        res.writeHead(503,{'Content-Type':'text/html;charset=utf-8'}) //erros do servidor 500 / erros do cliente 400
        res.end('ERRO: '+req.method+' não está implementado...')       
    }
})

myServer.listen(4444,()=>{
    console.log('Servidor à escuta na porta 4444...')
})

function recuperaInfo (request,callback) {
    const FORM_URLENCONDED = 'application/x-www-form-urlencoded'
    if(request.headers['content-type'] === FORM_URLENCONDED) {
        let body = ''
        request.on('data', chunk => {
            body += chunk.toString()
        })
        request.on('end',()=> {
            callback(parse(body))
        })
    }
    else {
        callback(null)
    }
}
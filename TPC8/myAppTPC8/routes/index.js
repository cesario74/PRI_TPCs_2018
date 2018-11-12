var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var formidable = require('formidable')
var fs = require('fs')

var myDB = __dirname + "/ficheiros.json"

/* GET home page. */
router.get('/', (req, res) => res.render('index'))

router.get('/ficheiro', (req,res)=> {
  jsonfile.readFile(myDB, (erro,fich)=> {
    if(!erro) res.render('list',{list: fich})
    else res.json(erro)
  })
})

router.post('/processar',(req,res)=> {
  var form = new formidable.IncomingForm()
  var r = JSON.stringify('')
  form.parse(req,(erro,fields,files)=> {

    var fichEnviado = files.ficheiro.path
    console.dir(fichEnviado)
    var fichNovo = './public/files/'+files.ficheiro.name
    r = JSON.stringify(files.ficheiro.name)
    fs.rename(fichEnviado,fichNovo,erro => {
      if(!erro) {
        console.dir('Ficheiro: '+files.ficheiro.name+' gravado com sucesso!')
        res.json(r)
      }
      else {
        console.dir(erro)
      }
    }) 
  })
})

router.post('/ficheiro/submeter', (req,res)=> {
  var f = req.body.ficheiro
  var d = req.body.descricao
  jsonfile.readFile(myDB, (erro, fich)=> {
    if(!erro) {
      fich.push({descricao: d, nome: f})
      console.dir(fich)
      jsonfile.writeFile(myDB,fich,erro2 => {
        if(!erro2)
          console.log('Registo gravado com sucesso!')
        else
          console.log('Erro: '+erro2)
      })
    }
    else
      console.log('Erro: '+erro)
    })
    res.json(f)
  })




module.exports = router;
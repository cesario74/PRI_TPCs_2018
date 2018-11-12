$(() => {
    $('#ficheiros').load('http://localhost:7474/ficheiro')


    $('#submeter').click(e=> {
        e.preventDefault()
        var filename = $('#ficheiro').val().split('\\').pop();
        var url = '"/files/'+filename+'"'
        $('#ficheiros').append('<tr><td>'+ '<a href='+url+'>'+filename+'</a>'+'</td>'+'<td>'+$('#descricao').val()+'</td></tr>')
        ajaxPost()
        formPost()
    })

    function ajaxPost() {
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url: "http://localhost:7474/ficheiro/submeter",
            data: JSON.stringify({ficheiro: $('#ficheiro').val().split('\\').pop(),descricao: $('#descricao').val()}),
            success: p => alert('Dados gravados com sucesso!'+p),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }
        })
    }

    function formPost() {
        var form_data = new FormData($('#uploader')[0]);
        $.ajax({
            type:'POST',
            url:'http://localhost:7474/processar',
            processData: false,
            contentType: false,
            async: true,
            cache: false,
            data : form_data,
            timeout: 10000,
            success: p => alert('Ficheiro gravado com sucesso!'+p),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }       
        })
        $('#descricao').val('')
        $('#ficheiro').val('')
    }
})
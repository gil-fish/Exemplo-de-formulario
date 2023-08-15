/* código assincrono */

async function buscaEndereço(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        //converter retorno do fetch em JSON
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        //Preenchimento automático
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente.</p>`
        console.log(erro);
    }
}

//Consulta dinâmica
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereço(cep.value));

/* várias requisições 
let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereço(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
*/
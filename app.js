let listaNumSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = numeroAleatorio();
let tentativa = 1;
let i = 1;

exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto.');
    exibirTextoNaTela('p',`Escolha um número entre 1 e ${numeroLimite}: `);
}

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){

        exibirTextoNaTela('h1','Acertou');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu um número secreto com ${tentativa} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p',`O número secreto é menor que ${chute}.`);

        }else{
            exibirTextoNaTela('p',`O número secreto é maior que ${chute}.`);
        }
        limparCampo();
        tentativa++;
    }
}

function reiniciarJogo(){
    i++;
    numeroSecreto = numeroAleatorio();
    console.log(`O número aleatório ${i} é: ${numeroSecreto}`);
    limparCampo();
    tentativa = 1;

    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function numeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1 );
    let quantDeElemNaLista = listaNumSorteados.length;

    if (quantDeElemNaLista == numeroLimite){
        listaNumSorteados = [];
    }else{
        if (listaNumSorteados.includes(numeroEscolhido)){
            return numeroAleatorio();
        }else {
            listaNumSorteados.push(numeroEscolhido);
            console.log(listaNumSorteados);
            return numeroEscolhido;
        }
    }
}



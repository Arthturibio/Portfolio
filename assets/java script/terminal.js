const comando = 'fastfetch';
const textoComando = document.querySelector('#terminal-text');
const resultadoFastfetch = document.querySelector('#fastfetch');
const skills = document.querySelector('#terminal-skills');
const linhaComando = document.querySelector('#terminal-command');
const cursor = document.querySelector('.terminal-cursor');
const linhasFastfetch = document.querySelectorAll('[data-fastfetch-line]');
const chavePrimeiraVisita = 'portfolio-fastfetch-exibido';
const prefereMovimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function mostrarResultado() {
    resultadoFastfetch.hidden = false;
    cursor.hidden = true;
}

function escreverComando(posicao = 0) {
    textoComando.textContent = comando.slice(0, posicao);

    if (posicao < comando.length) {
        setTimeout(() => escreverComando(posicao + 1), 120);
        return;
    }

    mostrarResultado();
    setTimeout(() => escreverSequencia(linhasFastfetch, mostrarSkills), 250);
}

function escreverSequencia(linhas, aoTerminar, posicao = 0) {
    if (posicao >= linhas.length) {
        if (aoTerminar) aoTerminar();
        return;
    }

    linhas[posicao].classList.add('visivel');
    setTimeout(() => escreverSequencia(linhas, aoTerminar, posicao + 1), 110);
}

function mostrarSkills() {
    skills.hidden = false;
    linhaComando.classList.add('escondido');
}

if (sessionStorage.getItem(chavePrimeiraVisita) || prefereMovimentoReduzido) {
    // Em visitas seguintes, mostra o resultado completo sem repetir a animação.
    textoComando.textContent = comando;
    linhasFastfetch.forEach((linha) => linha.classList.add('visivel'));
    mostrarResultado();
    // skills.hidden = false;
    // linhaComando.classList.add('escondido');
    mostrarSkills(); // A AI faz um função pra esconder e copia o código de dentro da função pra usar >:p
} else {
    // Guarda a visita e escreve o comando e as linhas uma vez nesta sessão.
    sessionStorage.setItem(chavePrimeiraVisita, 'sim');
    escreverComando();
}

// ===== Ano do rodapé =====
// pega o span do ano pelo id
const ano = document.getElementById("ano");

// troca o texto pelo ano atual
ano.textContent = new Date().getFullYear();



// ===== Botão de voltar ao topo =====
// pega o botão pelo id
const botaoTopo = document.getElementById("botao-topo");

// mostra o botão só depois de rolar 300px
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }
});

// ao clicar, volta ao topo com rolagem suave
botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});



// ===== Menu com a seção atual =====
// pega todos os links do menu e todas as seções
const linksMenu = document.querySelectorAll("nav a");
const secoes = document.querySelectorAll("section");

function marcarSecaoAtual() {
    // por padrão fica o "Início", que tem href="#"
    let atual = "#";

    // percorre as seções em ordem; a última que já passou de 250px do topo é a atual
    secoes.forEach(function (secao) {
        if (secao.getBoundingClientRect().top <= 250) {
            atual = "#" + secao.id;
        }
    });

    // no fim da página, o Contato é curto e nunca chega ao topo, então marca ele na mão
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        atual = "#contato";
    }

    // liga a classe "ativo" só no link da seção atual
    linksMenu.forEach(function (link) {
        if (link.getAttribute("href") === atual) {
            link.classList.add("ativo");
            link.setAttribute("aria-current", "true");
        } else {
            link.classList.remove("ativo");
            link.removeAttribute("aria-current");
        }
    });
}

// atualiza ao rolar e também uma vez ao carregar a página
window.addEventListener("scroll", marcarSecaoAtual, { passive: true });
marcarSecaoAtual();



// ===== Título digitando =====
// pega o título e guarda o texto completo
const titulo = document.querySelector("header h1");
const textoCompleto = titulo.textContent.trim();

// quem pediu menos animações no sistema vê o título normal, sem efeito
const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!menosMovimento) {
    // um span para o que já foi digitado e outro para o que falta
    const digitado = document.createElement("span");
    digitado.className = "digitado";
    digitado.setAttribute("aria-hidden", "true");

    const restante = document.createElement("span");
    restante.className = "restante";
    restante.setAttribute("aria-hidden", "true");
    restante.textContent = textoCompleto;

    // leitores de tela leem o texto completo de uma vez, e não letra por letra
    titulo.setAttribute("aria-label", textoCompleto);
    titulo.classList.add("digitando");
    titulo.textContent = "";
    titulo.append(digitado, restante);

    let posicao = 0;

    // a cada 60ms passa uma letra do "restante" para o "digitado"
    const intervalo = setInterval(function () {
        posicao++;
        digitado.textContent = textoCompleto.slice(0, posicao);
        restante.textContent = textoCompleto.slice(posicao);

        // quando acabou o texto, para o relógio
        if (posicao >= textoCompleto.length) {
            clearInterval(intervalo);
        }
    }, 60);
}
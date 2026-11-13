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
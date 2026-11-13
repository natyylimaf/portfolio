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
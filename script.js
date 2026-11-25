// Lista com as suas fotos, o vídeo e 3 espaços reservados para completar
const memoriasIniciais = [
    {
        id: 1,
        titulo: "Viadinho & Bruxinha",
        categoria: "eventos",
        arquivo: "img/viadinho&bruxinha.jpg",
        tipo: "imagem",
        descricao: "As fantasias impecáveis direto na sala de aula.",
        curtidas: 32
    },
    {
        id: 2,
        titulo: "Trote de Personagens",
        categoria: "eventos",
        arquivo: "img/trotepersonagens2.jpg",
        tipo: "imagem",
        descricao: "O esquadrão reunido no pátio!",
        curtidas: 41
    },
    {
        id: 3,
        titulo: "Trote no Lugar Errado",
        categoria: "sala",
        arquivo: "img/trotelugarerrado.jpg",
        tipo: "imagem",
        descricao: "Quando a caracterização está em dia, mas o cenário entrega.",
        curtidas: 28
    },
    {
        id: 4,
        titulo: "Baby & Otis",
        categoria: "eventos",
        arquivo: "img/trotebaby&otis.jpg",
        tipo: "imagem",
        descricao: "Dupla icônica no trote de personagens.",
        curtidas: 45
    },
    {
        id: 5,
        titulo: "Priscilla & Pucca",
        categoria: "eventos",
        arquivo: "img/priscilla&pucca.jpg",
        tipo: "imagem",
        descricao: "Entregando tudo no visual!",
        curtidas: 39
    },
    {
        id: 6,
        titulo: "Labrola",
        categoria: "sala",
        arquivo: "img/labrola.jpg",
        tipo: "imagem",
        descricao: "Registro clássico nos corredores do colégio.",
        curtidas: 27
    },
    {
        id: 7,
        titulo: "Jigsaw, Bruxa e Vampiro",
        categoria: "eventos",
        arquivo: "img/jigsaw,bruxa,vampiro.jpg",
        tipo: "imagem",
        descricao: "Trio do terror passando na sua timeline.",
        curtidas: 50
    },
    {
        id: 8,
        titulo: "Halloween 2025",
        categoria: "eventos",
        arquivo: "img/halloween2025.jpg",
        tipo: "imagem",
        descricao: "A maquiagem impecável no espelho!",
        curtidas: 48
    },
    {
        id: 9,
        titulo: "Beatle John e uma Caipira",
        categoria: "eventos",
        arquivo: "img/beatlejohneumacaipira.jpg",
        tipo: "imagem",
        descricao: "Encontro de universos no terceirão.",
        curtidas: 34
    },
    {
        id: 10,
        titulo: "Resenha em Vídeo 🎥",
        categoria: "eventos",
        arquivo: "img/video_1.mp4",
        tipo: "video",
        descricao: "Aquele registro em movimento que não podia faltar.",
        curtidas: 53
    },

    // --- ESPAÇOS RESERVADOS PARA AS 3 FOTOS QUE FALTAM ---
    {
        id: 11,
        titulo: "Memória Extra #1 (Em breve)",
        categoria: "viagens",
        arquivo: "img/foto_extra1.jpg", // Troque pelo nome da foto 1
        tipo: "imagem",
        descricao: "Espaço guardado para mais um momento épico da turma.",
        curtidas: 10
    },
    {
        id: 12,
        titulo: "Memória Extra #2 (Em breve)",
        categoria: "sala",
        arquivo: "img/foto_extra2.jpg", // Troque pelo nome da foto 2
        tipo: "imagem",
        descricao: "Espaço guardado para mais um momento épico da turma.",
        curtidas: 10
    },
    {
        id: 13,
        titulo: "Memória Extra #3 (Em breve)",
        categoria: "eventos",
        arquivo: "img/foto_extra3.jpg", // Troque pelo nome da foto 3
        tipo: "imagem",
        descricao: "Espaço guardado para mais um momento épico da turma.",
        curtidas: 10
    }
];

const recadosIniciais = [
    { autor: "Miga da turma", texto: "Os melhores trotes e fantasias foram os nossos, sem dúvidas!" },
    { autor: "Terceirão", texto: "Vou sentir muita falta dessas resenhas no intervalo!" }
];

// Nota: Mudei a chave do localStorage para 'memoriasTerceiraoV2' para carregar suas fotos novas
let memorias = JSON.parse(localStorage.getItem('memoriasTerceiraoV2')) || memoriasIniciais;
let recados = JSON.parse(localStorage.getItem('recadosTerceiraoV2')) || recadosIniciais;

const muralEl = document.getElementById('mural-memorias');
const listaRecadosEl = document.getElementById('lista-recados');

// Renderizar Polaroids (com suporte a foto e vídeo)
function renderizarMemorias(filtro = 'todas') {
    muralEl.innerHTML = '';

    const filtradas = filtro === 'todas' 
        ? memorias 
        : memorias.filter(m => m.categoria === filtro);

    filtradas.forEach(memoria => {
        const card = document.createElement('article');
        card.className = 'polaroid';

        // Verifica se é vídeo ou imagem
        const midiaHTML = memoria.tipo === 'video'
            ? `<video src="${memoria.arquivo}" controls muted loop playsinline></video>`
            : `<img src="${memoria.arquivo}" alt="${memoria.titulo}" onerror="this.src='https://placehold.co/400x300/ffeaa7/2d3436?text=Foto+em+breve+📸'">`;

        card.innerHTML = `
            ${midiaHTML}
            <h3>${memoria.titulo}</h3>
            <p>${memoria.descricao}</p>
            <button class="btn-curtir" onclick="curtirMemoria(${memoria.id})">
                ❤️ ${memoria.curtidas}
            </button>
        `;
        muralEl.appendChild(card);
    });
}

// Função de curtir
window.curtirMemoria = function(id) {
    const item = memorias.find(m => m.id === id);
    if (item) {
        item.curtidas++;
        salvarDados();
        const categoriaAtiva = document.querySelector('.filtro-btn.active').dataset.categoria;
        renderizarMemorias(categoriaAtiva);
    }
};

// Filtros
document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filtro-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderizarMemorias(btn.dataset.categoria);
    });
});

// Modal de Nova Memória
const modal = document.getElementById('modal-memoria');
document.getElementById('btn-nova-memoria').addEventListener('click', () => modal.classList.remove('hidden'));
document.getElementById('fechar-modal').addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('form-memoria').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const caminhoArquivo = document.getElementById('imagem-memoria').value;
    const isVideo = caminhoArquivo.toLowerCase().endsWith('.mp4');

    const novaMemoria = {
        id: Date.now(),
        titulo: document.getElementById('titulo-memoria').value,
        categoria: document.getElementById('categoria-memoria').value,
        arquivo: caminhoArquivo,
        tipo: isVideo ? 'video' : 'imagem',
        descricao: document.getElementById('descricao-memoria').value,
        curtidas: 1
    };

    memorias.unshift(novaMemoria);
    salvarDados();
    renderizarMemorias();
    e.target.reset();
    modal.classList.add('hidden');
});

// Recados da Cápsula do Tempo
function renderizarRecados() {
    listaRecadosEl.innerHTML = '';
    recados.forEach(recado => {
        const postIt = document.createElement('div');
        postIt.className = 'post-it';
        postIt.innerHTML = `
            <p>"${recado.texto}"</p>
            <strong>— ${recado.autor}</strong>
        `;
        listaRecadosEl.appendChild(postIt);
    });
}

document.getElementById('form-recado').addEventListener('submit', (e) => {
    e.preventDefault();
    const autor = document.getElementById('autor-recado').value;
    const texto = document.getElementById('texto-recado').value;

    recados.unshift({ autor, texto });
    salvarDados();
    renderizarRecados();
    e.target.reset();
});

function salvarDados() {
    localStorage.setItem('memoriasTerceiraoV2', JSON.stringify(memorias));
    localStorage.setItem('recadosTerceiraoV2', JSON.stringify(recados));
}

// Inicializar página
renderizarMemorias();
renderizarRecados();

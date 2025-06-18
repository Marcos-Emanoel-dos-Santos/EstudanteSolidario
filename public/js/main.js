import * as toggle from './toggle.js';

// Listeners para os popups do cabeçalho e de criar tarefa
document.getElementById('menu-toggle').addEventListener('click', toggle.toggleMenu);
document.getElementById('login').addEventListener('click', toggle.loginPopUp);
document.querySelectorAll('.login-exit-button').forEach(button => {
    button.addEventListener('click', toggle.exitLoginPopup);
});
document.querySelectorAll('.work-exit-button').forEach(button => {
    button.addEventListener('click', toggle.removeWorkPopUp);
});
document.getElementById('goto-signin-button').addEventListener('click', toggle.signinPopUp);
document.getElementById('mkWork-Button').addEventListener('click', toggle.createWorkPopUp);

// Função para carregar e exibir os posts do backend
async function loadPosts() {
    try {
        const response = await fetch("/posts");
        if (!response.ok) {
            // Se a resposta não for OK, lança um erro para ser pego pelo catch
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        const container = document.getElementById("activities");
        container.innerHTML = ""; // Limpa os cards existentes antes de adicionar os novos

        if (posts.length === 0) {
            container.innerHTML = "<p>Nenhuma tarefa encontrada no momento.</p>";
            return;
        }

        posts.forEach((post) => {
            // Usando a nova estrutura de .task-card com os dados do post
            const postHTML = `
                <div class="task-card" data-id="${post.id}">
                    <img class="task-card-image" src="https://placehold.co/600x400/10B981/ffffff?text=Voluntariado" alt="Imagem da Tarefa">
                    <div class="task-card-content">
                        <div class="task-card-tags">
                            <span class="tag tag-modality">${post.modality || 'Presencial'}</span>
                        </div>
                        <h3 class="task-card-title">${post.title}</h3>
                        <p class="task-card-description">${post.content}</p>
                        <div class="task-card-info">
                            <div class="info-item">
                                <span>Postado em: ${new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button class="help-button"><span>Quero ajudar</span></button>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", postHTML);
        });
    } catch (err) {
        console.error("Erro ao carregar posts:", err);
        const container = document.getElementById("activities");
        // Exibe a mensagem de erro para o usuário
        container.innerHTML = "<p>Ocorreu um erro ao carregar as tarefas. Tente novamente mais tarde.</p>";
    }
}

// Lógica principal executada quando o HTML estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    // Carrega os posts assim que a página é carregada
    loadPosts();

    // --- LÓGICA DOS FILTROS --- //
    const botaoPrincipalFiltro = document.querySelector('.botao-filtro:not([data-filter])');
    if (botaoPrincipalFiltro) {
        const botoesDeFiltro = document.querySelectorAll('.botao-filtro[data-filter]');
        const iconeSeta = botaoPrincipalFiltro.querySelector('.icone-seta');
        const campoTexto = document.getElementById('filtro-texto-input');
        const campoData = document.getElementById('filtro-data-input');
        const selecaoArea = document.getElementById('filtro-area-select');
        const selecaoPessoa = document.getElementById('filtro-pessoa-select');
        const containerCamposDinamicos = document.querySelector('.container-campos-dinamicos');
        let filtrosEstaoVisiveis = false;

        botoesDeFiltro.forEach(botao => {
            botao.classList.add('filtro-animado');
            botao.style.display = 'none';
        });

        const esconderCamposDinamicos = () => {
            campoTexto.classList.remove('visivel');
            campoData.classList.remove('visivel');
            selecaoArea.classList.remove('visivel');
            selecaoPessoa.classList.remove('visivel');
            containerCamposDinamicos.style.height = '0px';
        };

        const gerenciarCamposDinamicos = () => {
            const filtroAtivo = document.querySelector('.botao-filtro[data-filter].ativo');
            let campoParaMostrar = null;

            esconderCamposDinamicos();

            if (filtroAtivo) {
                const tipoFiltro = filtroAtivo.getAttribute('data-filter');
                switch (tipoFiltro) {
                    case 'universidade':
                    case 'titulo':
                        campoTexto.placeholder = `Digite o ${tipoFiltro}...`;
                        campoParaMostrar = campoTexto;
                        break;
                    case 'area':
                        campoParaMostrar = selecaoArea;
                        break;
                    case 'pessoa':
                        campoParaMostrar = selecaoPessoa;
                        break;
                    case 'data':
                        campoParaMostrar = campoData;
                        break;
                }
            }

            if (campoParaMostrar) {
                campoParaMostrar.classList.add('visivel');
                containerCamposDinamicos.style.height = '46px';
            } else {
                containerCamposDinamicos.style.height = '0px';
            }
        };

        const toggleFiltros = () => {
            filtrosEstaoVisiveis = !filtrosEstaoVisiveis;
            iconeSeta.style.transform = filtrosEstaoVisiveis ? 'rotate(90deg)' : 'rotate(0deg)';
            
            if (filtrosEstaoVisiveis) {
                botoesDeFiltro.forEach((botao, index) => {
                    botao.style.display = 'flex';
                    setTimeout(() => botao.classList.remove('filtro-animado'), 20 + index * 40);
                });
            } else {
                botoesDeFiltro.forEach(botao => {
                    botao.classList.add('filtro-animado');
                    botao.classList.remove('ativo');
                    setTimeout(() => { if (!filtrosEstaoVisiveis) botao.style.display = 'none'; }, 300);
                });
                esconderCamposDinamicos();
            }
        };

        botaoPrincipalFiltro.addEventListener('click', toggleFiltros);

        botoesDeFiltro.forEach(botao => {
            botao.addEventListener('click', (e) => {
                e.stopPropagation();
                const estavaAtivo = botao.classList.contains('ativo');
                botoesDeFiltro.forEach(btn => btn.classList.remove('ativo'));
                if (!estavaAtivo) botao.classList.add('ativo');
                gerenciarCamposDinamicos();
            });
        });
    }

    // --- LÓGICA DO MODAL 'QUERO AJUDAR' --- //
    const modalOverlay = document.getElementById('modal-overlay');
    const helpModal = document.getElementById('help-modal');
    const closeModalBtn = document.getElementById('close-modal-button');
    const cancelBtn = document.getElementById('cancel-button');
    const confirmBtn = document.getElementById('confirm-button');
    const activitiesContainer = document.getElementById('activities');

    const openModal = () => {
        if (modalOverlay && helpModal) {
            modalOverlay.classList.add('visible');
            helpModal.classList.add('visible');
        }
    };

    const closeModal = () => {
        if (modalOverlay && helpModal) {
            modalOverlay.classList.remove('visible');
            helpModal.classList.remove('visible');
        }
    };

    if (activitiesContainer) {
        activitiesContainer.addEventListener('click', (event) => {
            if (event.target.closest('.help-button')) {
                openModal();
            }
        });
    }

    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            console.log('Participação confirmada!');
            closeModal();
        });
    }
});

const universityInput = document.getElementById("university");
const studentAreaSelect = document.getElementById("student-area-select");

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Erro desconhecido");

            // Exibir mensagem e fechar popup (se desejar)
            document.getElementById("login-mensagem").innerText = data.message;
            console.log("Usuário logado:", data.user);

            // Armazenar dados do usuário
            localStorage.setItem("usuarioLogado", JSON.stringify(data.user));

            // Ocultar popup de login
            toggle.exitLoginPopup();

        } catch (err) {
            document.getElementById("login-mensagem").innerText = "Erro: " + err.message;
        }
    });
}

document.querySelector("#div-signup form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Coletar dados do formulário
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("passowrd-signup").value.trim();

    const day = document.getElementById("birthDay").value;
    const month = document.getElementById("birthMonth").value;
    const year = document.getElementById("year").value;
    const birthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    const university = document.getElementById("university").value.trim() || "NotStudent";
    const course = document.getElementById("student-area-select").value || "NotStudent";

    const name = `${fname} ${lname}`;

    if (!name || !email || !password || !birthday) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        const res = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, birthday, course, university, email, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Erro ao criar conta.");

        alert("Conta criada com sucesso!");
        toggle.exitLoginPopup(); // ou: fechar popup de cadastro, abrir login etc.

    } catch (err) {
        console.error(err);
        alert("Erro: " + err.message);
    }
});

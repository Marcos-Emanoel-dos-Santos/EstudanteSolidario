# EstudanteSolidario
Aplicação web que permite que estudantes universitários ajudem a população geral através de trabalhos voluntários.

## Como rodar o projeto localmente
Para ativar o banco de dados e servidor backend, siga esses passos:
```
git clone https://github.com/alifoo/EstudanteSolidario # clonar o projeto
cd EstudanteSolidario # acessar a pasta do projeto
npm install # instalar as dependencias
node js/server.js # rodar o server localmente
```

## Development Roadmap

### Base

- [x] Formular identidade visual do projeto no Figma
- [x] Criação da base do projeto
    - [x] Base HTML
    - [x] Base CSS

### Front

#### Primeira etapa
- [ ] Formulário de criação de perfil de voluntário (estudante)
- [ ] Formulário de cadastro de usuário (cidadão)
- [ ] Formulário de criação de solicitação de trabalho voluntário

#### Segunda etapa
- [ ] Tela de perfil do usuário (estudante)
- [ ] Tela de perfil do usuário (cidadão)
- [ ] Tela de trabalho voluntário individual
- [ ] Tela principal do projeto, onde ficará a listagem de todos os trabalhos voluntários disponíveis

### Back-end

#### Primeira etapa
- [ ] Armazenamento de informações respondidas em cada um dos formulários em variáveis inicialmente
- [ ] Separação de categorias
- [ ] Funcionalidade de botões (botão para se candidatar, botão para se inscrever (sign up), etc)
- [ ] Lógica de listagem de trabalhos voluntários na tela inicial
- [ ] Direcionamento de itens clicáveis (clicar em tal botão vai pro perfil, clicar em determinado texto vai para um link, etc)

#### Segunda etapa
- [x] Implementar banco de dados simples com SQLite
- [ ] Lógica para a busca de informações no banco
    - [ ] Busca de info do perfil do usuário
    - [ ] Busca de info trabalhos voluntários
- [ ] Lógica de filtragem por categoria na tela inicial

## Se sobrar tempo

- [ ] Lógica de busca por palavra chave
- [ ] Página de "sobre o projeto"

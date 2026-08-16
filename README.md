# Instituto ADE — Curso Livre de Psicanálise

Plataforma web de estudos criada para organizar uma formação livre em Psicanálise com conteúdo extenso, progressão por módulos, avaliações teóricas, videoaulas incorporadas, biblioteca, perfil acadêmico e Laboratório de simulação com IA.

> **Importante:** este projeto é um ambiente educacional. O certificado do sistema representa conclusão do programa livre de estudos e não equivale a diploma de graduação, título de Psicólogo, registro profissional ou habilitação clínica automática.

## O que existe no sistema

- Aba **Principal** com apresentação da proposta, motivações e benefícios.
- **Início** com continuidade de estudo e mapa da formação.
- **Curso** organizado em ciclos, módulos e aulas.
- Conteúdo didático aprofundado em `content.js` e arquivos de ciclo.
- **Videoaulas incorporadas** dentro das aulas.
- Avaliações teóricas com nota mínima de 70%.
- **Laboratório Clínico com IA**, liberado progressivamente após os módulos.
- **Biblioteca** de autores, conceitos, obras e audiovisual.
- **Perfil do estudante** com foto, progresso, notas, práticas e objetivos pessoais.
- Certificado de conclusão ao final do percurso.
- Layout responsivo para celular e computador.
- Tema escuro e identidade visual própria do Instituto ADE.

## Estrutura do repositório

```text
psicanalise-curso/
├── README.md
├── .gitignore
├── docs/
│   ├── ARQUITETURA.md
│   ├── CONTEUDO.md
│   └── DEPLOY-CLOUDFLARE.md
├── site/
│   ├── index.html
│   ├── app.js
│   ├── content.js
│   ├── content/
│   │   ├── cycle-1.js
│   │   ├── cycle-2.js
│   │   ├── cycle-3.js
│   │   ├── cycle-4.js
│   │   ├── cycle-5.js
│   │   └── finalize.js
│   ├── videos.js
│   ├── styles.css
│   ├── ade-logo.png
│   ├── ade-background.jpg
│   └── vercel.json
└── worker/
    ├── package.json
    ├── wrangler.jsonc
    └── src/
        └── worker.js
```

## Como o sistema foi construído

### 1. Primeira versão

A aplicação começou como um site estático simples para concentrar o conteúdo de Psicanálise em um único ambiente. A escolha inicial por HTML, CSS e JavaScript puro permitiu colocar o projeto online rapidamente, sem banco de dados ou servidor próprio.

### 2. Currículo

O conteúdo inicial era pequeno demais para o objetivo da formação. A estrutura foi então ampliada para um currículo de alta densidade. O conteúdo foi separado da interface e organizado em dados estruturados, permitindo manter aulas, conceitos, tarefas e provas sem acoplar tudo ao layout.

No repositório, o conteúdo foi dividido por ciclos em `site/content/` para facilitar manutenção e revisão. `site/content.js` contém a base e o construtor das seções didáticas; os arquivos `cycle-*.js` registram os módulos; `finalize.js` conclui a montagem do objeto `COURSE` usado pela interface.

### 3. Sistema de progresso

O sistema registra no `localStorage` quais aulas foram concluídas e quais provas foram aprovadas. A interface calcula automaticamente progresso geral e progresso por módulo.

Não existe servidor de usuários na arquitetura atual. Isso deixa a aplicação simples e gratuita, mas significa que o progresso fica no navegador onde foi realizado.

### 4. Avaliações

Cada módulo possui uma avaliação teórica. O sistema calcula a nota no navegador e libera as etapas seguintes quando o estudante atinge o critério definido.

A intenção pedagógica é combinar leitura passiva com recuperação ativa do conteúdo.

### 5. Laboratório Clínico com IA

O Laboratório começou como casos fictícios estáticos e foi transformado em uma conversa generativa.

O navegador envia a conversa para um Cloudflare Worker. Esse Worker usa **Cloudflare Workers AI** através do binding `AI`.

Há duas funções conceitualmente separadas:

- **Modo Paciente:** a IA interpreta somente o personagem fictício e não dá respostas ao estudante.
- **Modo Avaliador:** depois que a sessão termina, a IA analisa a conversa e produz uma devolutiva pedagógica.

Os casos são graduados de acordo com o avanço no curso. A IA é instruída a não exigir conhecimentos de módulos que ainda não foram estudados.

### 6. Videoaulas

Os antigos links que apenas faziam pesquisas no YouTube foram substituídos por um catálogo audiovisual em `videos.js`. As aulas exibem um player incorporado diretamente no sistema.

O projeto usa `youtube-nocookie.com/embed/...`, permitindo assistir ao vídeo sem abandonar a página da aula.

### 7. Redesign visual

A interface foi reconstruída para reduzir o aspecto de dashboard genérico e ficar mais próxima de uma biblioteca acadêmica contemporânea.

Foram criados:

- navegação lateral compacta;
- identidade visual escura com detalhes dourados;
- aba Principal de apresentação;
- carrosséis de motivação e benefícios;
- curso organizado em ciclos;
- experiência editorial de leitura;
- laboratório visualmente parecido com uma sala de atendimento;
- biblioteca organizada por tipo de recurso;
- logo e imagem de fundo próprias.

### 8. Perfil

O círculo inferior da navegação passou a abrir uma página de perfil. A área reúne dados acadêmicos, avaliações, progresso e foto de perfil.

A imagem escolhida pelo usuário é convertida no navegador e armazenada localmente.

### 9. Acesso

Versões anteriores possuíam uma tela de senha. Ela foi removida na versão atual para permitir que o link abra diretamente na Aba Principal.

## Arquivos principais

### `site/index.html`
Documento HTML inicial. Carrega os recursos e fornece o elemento raiz em que a aplicação é renderizada.

### `site/app.js`
Controlador principal da aplicação. Responsável por navegação, renderização das páginas, progresso, provas, perfil, laboratório, armazenamento local e certificado.

### `site/content.js` + `site/content/`
Base de conteúdo pedagógico e arquivos por ciclo. Contêm módulos, aulas, conceitos, objetivos, textos, exercícios, avaliações, biblioteca e demais dados acadêmicos.

### `site/videos.js`
Catálogo de recursos audiovisuais usados dentro das aulas.

### `site/styles.css`
Todo o design do sistema, incluindo responsividade.

### `worker/src/worker.js`
Backend do Laboratório. Recebe as mensagens do navegador e chama o modelo de IA configurado no Cloudflare Workers AI.

## Rodar localmente

Como o site é estático, você pode usar qualquer servidor HTTP simples.

```bash
cd site
python -m http.server 8080
```

Depois abra:

```text
http://localhost:8080
```

Evite abrir apenas `index.html` por `file://`, pois algumas funções de navegador e integrações podem ter comportamento diferente fora de HTTP.

## Worker local/remoto

```bash
cd worker
npm install
npm run dev
```

Para publicar:

```bash
npm run deploy
```

É necessária uma conta Cloudflare com Workers AI disponível.

## Documentação adicional

- [Arquitetura](docs/ARQUITETURA.md)
- [Organização pedagógica](docs/CONTEUDO.md)
- [Deploy na Cloudflare](docs/DEPLOY-CLOUDFLARE.md)

## Situação atual

A aplicação está funcional como plataforma pessoal de estudos. Algumas decisões atuais — principalmente armazenamento somente no navegador — foram escolhidas para manter o sistema simples. Caso o projeto passe a atender vários estudantes, a próxima evolução arquitetural recomendada é adicionar autenticação, banco de dados e sincronização de progresso no servidor.

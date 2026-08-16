# Instituto ADE — Curso Livre de Psicanálise

Plataforma web de estudos criada para organizar uma formação livre em Psicanálise com conteúdo progressivo, avaliações teóricas, videoaulas incorporadas, biblioteca, perfil acadêmico e Laboratório de simulação com IA.

> **Importante:** este projeto é um ambiente educacional. O certificado do sistema representa conclusão do programa livre de estudos e não equivale a diploma de graduação, título de Psicólogo, registro profissional ou habilitação clínica automática.

## Recursos principais

- Aba **Principal** com apresentação, motivações, benefícios e carrosséis verticais.
- **Início** com continuidade de estudo e mapa da formação.
- **Curso** dividido em 20 módulos e 120 aulas.
- Conteúdo didático estruturado por conceitos, objetivos, exemplos, leitura crítica e atividades.
- **Videoaulas incorporadas** diretamente nas aulas.
- Avaliações teóricas com critério de aprovação de 70%.
- **Laboratório Clínico com IA**, liberado progressivamente após os módulos.
- **Biblioteca** de autores, conceitos, obras e audiovisual.
- **Perfil do estudante** com foto, progresso, notas, práticas, conquistas e objetivo pessoal.
- Certificado de conclusão ao final do percurso.
- Tema escuro, identidade visual própria e layout responsivo para celular e computador.

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
│   ├── README.md
│   ├── index.html
│   ├── content.js
│   ├── videos.js
│   ├── vercel.json
│   ├── ade-logo.png
│   ├── ade-background.jpg
│   ├── content/
│   │   ├── modules.js
│   │   └── finalize.js
│   ├── app/
│   │   ├── core.js
│   │   ├── pages.js
│   │   ├── study-lab.js
│   │   ├── library-profile.js
│   │   └── runtime.js
│   └── styles/
│       ├── base.css
│       └── enhancements.css
└── worker/
    ├── package.json
    ├── wrangler.jsonc
    └── src/
        ├── worker.js
        └── blueprints.js
```

# Como o sistema foi construído

## 1. Base estática

O Instituto ADE começou como uma aplicação estática em HTML, CSS e JavaScript puro. Essa escolha permite hospedar o site com baixo custo e sem uma etapa de compilação obrigatória.

O arquivo `site/index.html` é o ponto de entrada. Ele carrega os arquivos de conteúdo, catálogo audiovisual, aplicação e estilos na ordem correta.

## 2. Separação entre conteúdo e interface

O conteúdo do curso não fica escrito diretamente nos componentes visuais. A base acadêmica é organizada em `site/content.js` e `site/content/modules.js`.

`content.js` define:

- metadados do curso;
- bibliografia;
- glossário;
- gerador das seções didáticas;
- funções que completam cada aula com objetivos, reflexão, atividades e provas.

`content/modules.js` registra os 20 módulos e suas 120 aulas. `content/finalize.js` conclui a montagem do objeto global `COURSE` utilizado pelo restante da aplicação.

Essa divisão permite alterar a interface sem reescrever o currículo e ampliar o currículo sem reconstruir a navegação.

## 3. Aplicação dividida por responsabilidade

A versão inicial possuía um único JavaScript grande. No repositório ele foi organizado em arquivos menores:

### `site/app/core.js`
Estado global, preferências, progresso, ciclos do curso, dados da Aba Principal e estrutura comum da navegação.

### `site/app/pages.js`
Aba Principal, página Início e visualização do currículo.

### `site/app/study-lab.js`
Leitura das aulas, provas teóricas e interface do Laboratório Clínico.

### `site/app/library-profile.js`
Biblioteca, Perfil do estudante, certificado e funções auxiliares do Laboratório.

### `site/app/runtime.js`
Renderização, eventos, mudança de páginas, conclusão de aulas, correção das provas, upload da foto de perfil e chamadas ao Worker de IA.

## 4. Progresso e dados locais

A aplicação utiliza `localStorage` para armazenar:

- aulas concluídas;
- módulos aprovados;
- notas das avaliações;
- sessões do Laboratório;
- endereço do Worker de IA;
- preferências de leitura;
- foto e informações editáveis do perfil.

Essa arquitetura evita banco de dados no estágio atual. A consequência é que os dados ficam vinculados ao navegador/dispositivo e não são sincronizados automaticamente entre celular e computador.

## 5. Avaliações

Cada módulo segue a progressão:

```text
Aulas → Prova teórica → 70% ou mais → Laboratório com IA
```

A prova objetiva é calculada no navegador. Ao atingir o critério definido, o módulo libera a experiência prática.

## 6. Laboratório Clínico com IA

O Laboratório não é executado diretamente no navegador. O frontend chama um **Cloudflare Worker** em `worker/src/worker.js`.

O Worker utiliza o binding `AI` do **Cloudflare Workers AI**. Assim, nenhuma chave secreta precisa ser colocada no JavaScript público do site.

O fluxo possui dois papéis diferentes:

### Modo Paciente
A IA interpreta exclusivamente um personagem fictício. Ela pode apresentar resistência, silêncio, contradições e material transferencial de acordo com a dificuldade do módulo, sem revelar os conceitos que estão sendo avaliados.

### Modo Avaliador
Ao encerrar a conversa, a IA recebe a transcrição e devolve nota, competências observadas e feedback pedagógico.

`worker/src/blueprints.js` contém o desenho pedagógico das 20 etapas práticas. A dificuldade aumenta gradualmente de fundamental para integração clínica.

## 7. Videoaulas

`site/videos.js` contém o catálogo audiovisual. Em vez de enviar o estudante para uma pesquisa externa, a aplicação incorpora os vídeos com `youtube-nocookie.com/embed/...` dentro da própria aula.

O player continua oferecendo os controles nativos de reprodução, volume e tela cheia.

## 8. Evolução visual

O sistema passou por várias iterações:

- redesign escuro/editorial;
- organização do curso em ciclos;
- Aba Principal com carrosséis verticais;
- imagem de fundo discreta;
- melhoria de tipografia e contraste;
- aumento dos elementos nas abas secundárias;
- logo circular do Instituto ADE;
- Perfil acessível pelo círculo inferior esquerdo;
- remoção da antiga tela de senha.

A intenção visual é aproximar a experiência de uma biblioteca acadêmica contemporânea, evitando uma aparência genérica de dashboard.

## 9. Perfil

O perfil reúne:

- nome do estudante;
- foto editável;
- progresso geral;
- módulos e aulas concluídos;
- notas teóricas;
- resultados práticos;
- conquistas;
- curso em andamento;
- objetivo pessoal de estudo.

A foto é redimensionada no navegador usando `canvas` antes de ser armazenada localmente.

# Executar localmente

O site não precisa de Node.js para funcionar.

```bash
cd site
python -m http.server 8080
```

Abra:

```text
http://localhost:8080
```

# Executar o Worker

```bash
cd worker
npm install
npm run dev
```

Para publicar:

```bash
npm run deploy
```

O binding do Workers AI deve se chamar exatamente `AI`, conforme `worker/wrangler.jsonc`.

# Deploy

Veja o guia detalhado em [docs/DEPLOY-CLOUDFLARE.md](docs/DEPLOY-CLOUDFLARE.md).

# Documentação

- [Arquitetura](docs/ARQUITETURA.md)
- [Organização pedagógica](docs/CONTEUDO.md)
- [Deploy na Cloudflare](docs/DEPLOY-CLOUDFLARE.md)

# Limitações atuais e evolução futura

A arquitetura atual foi otimizada para um projeto pessoal e hospedagem simples. Para transformar o Instituto ADE em uma plataforma multiusuário, as próximas evoluções recomendadas são:

1. autenticação real de usuários;
2. banco de dados;
3. sincronização de progresso entre dispositivos;
4. painel administrativo para conteúdo;
5. armazenamento de imagens fora do `localStorage`;
6. histórico de avaliações no servidor;
7. controle de versões do currículo;
8. testes automatizados de frontend e Worker.

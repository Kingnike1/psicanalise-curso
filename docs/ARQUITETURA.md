# Arquitetura do Instituto ADE

## Visão geral

O Instituto ADE foi construído como uma aplicação web estática, sem framework e sem etapa de build obrigatória. A interface é formada por HTML, CSS e JavaScript executados diretamente no navegador. A única parte que precisa de backend é o Laboratório Clínico com IA, implementado como um Cloudflare Worker separado.

A arquitetura foi escolhida para manter o projeto simples de hospedar, barato de manter e fácil de publicar pelo Cloudflare Workers/Static Assets.

```text
Navegador
  |
  |-- index.html
  |-- styles.css
  |-- app.js
  |-- content.js + content/cycle-*.js
  |-- videos.js
  |-- ade-logo.png
  |-- ade-background.jpg
  |
  +---- HTTPS ----> Cloudflare Worker (worker/src/worker.js)
                       |
                       +---- binding AI ----> Cloudflare Workers AI
```

## Camada de apresentação

`site/index.html` é o ponto de entrada. Ele carrega os arquivos de estilo, conteúdo, catálogo audiovisual e lógica da aplicação.

`site/styles.css` contém o sistema visual: tema escuro, navegação lateral, páginas de curso, leitura, laboratório, biblioteca, certificado, perfil e regras responsivas.

`site/app.js` é a aplicação em si. Ele controla navegação, progresso, perfil, avaliações, biblioteca, laboratório, certificado e persistência local.

## Conteúdo didático

`site/content.js` contém o construtor comum das aulas e a configuração global. Os módulos foram divididos em `site/content/cycle-1.js` até `cycle-5.js` para facilitar manutenção. `site/content/finalize.js` finaliza a composição do objeto `COURSE` usado pelo aplicativo.

Cada módulo possui título, descrição, aulas, objetivos, conceitos, tarefas, leituras, reflexão e avaliação.

Separar o conteúdo da interface permite ampliar ou revisar aulas sem redesenhar toda a aplicação.

## Recursos audiovisuais

`site/videos.js` relaciona módulos/aulas a videoaulas incorporadas. O player usa o domínio `youtube-nocookie.com`, exibido dentro do sistema através de `iframe`, com controles do player como reprodução, volume e tela cheia.

## Persistência

O projeto atual utiliza `localStorage` do navegador para salvar:

- aulas concluídas;
- provas aprovadas e notas;
- configuração do Laboratório;
- sessões e resultados do Laboratório;
- preferências de leitura;
- dados editáveis do perfil;
- foto de perfil em formato Data URL.

Isso significa que os dados pertencem ao navegador/dispositivo atual. Não existe sincronização automática entre celular e computador nesta versão.

## Laboratório de IA

O diretório `worker/` contém o backend do Laboratório. O Worker expõe endpoints HTTP para:

- teste de saúde da API;
- início da simulação;
- continuidade da conversa;
- encerramento e avaliação pedagógica.

O binding `AI` liga o Worker ao Cloudflare Workers AI. O navegador nunca precisa receber uma chave secreta.

## Segurança e limites

O site não contém autenticação nesta versão. A aplicação é um ambiente de estudo e não deve armazenar informações clínicas reais, dados sensíveis de pacientes ou prontuários.

Os personagens do Laboratório são fictícios. A avaliação gerada por IA é pedagógica e não substitui supervisão clínica profissional.

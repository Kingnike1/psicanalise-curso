const stateKey='ade-psicanalise-progress-v2';
let state=JSON.parse(localStorage.getItem(stateKey)||'{"doneLessons":[],"passedQuizzes":[],"quizScores":{}}');
const labKey='ade-lab-state-v1';
let lab=JSON.parse(localStorage.getItem(labKey)||'{"apiUrl":"","activeCaseId":null,"activeSessionId":null,"sessions":{}}');
const prefsKey='ade-interface-prefs-v3';
let prefs=JSON.parse(localStorage.getItem(prefsKey)||'{"fontScale":1,"focus":false}');
const profileKey='ade-student-profile-v1';
let profile=JSON.parse(localStorage.getItem(profileKey)||'{"photo":"","goal":"Aprofundar meus conhecimentos em Psicanálise com estudo contínuo e aplicação responsável.","about":"Estudante do Instituto ADE."}');
function saveProfile(){localStorage.setItem(profileKey,JSON.stringify(profile))}
let view='principal', selectedModule=1, selectedLesson='1.1', search='', libraryTab='authors';

const totalLessons=COURSE.modules.reduce((n,m)=>n+m.lessons.length,0);
const totalModules=COURSE.modules.length;
const totalHours=COURSE.minimumHours||COURSE.modules.reduce((n,m)=>n+(m.estimatedHours||0),0);

const CYCLES=[
 {id:'I',title:'Fundamentos do pensamento psicanalítico',subtitle:'História, inconsciente, aparelho psíquico e pulsões',mods:[1,2,3,4]},
 {id:'II',title:'Constituição do sujeito e sofrimento',subtitle:'Desenvolvimento, narcisismo, sonhos, defesas e estruturas',mods:[5,6,7,8,9]},
 {id:'III',title:'A clínica e a técnica',subtitle:'Enquadre, escuta, transferência e casos clássicos',mods:[10,11,12]},
 {id:'IV',title:'Escolas e expansões da Psicanálise',subtitle:'Klein, Winnicott, Bion, Lacan e outras tradições',mods:[13,14,15,16,17,18]},
 {id:'V',title:'Crítica, ética e integração',subtitle:'Ciência, evidências, limites e síntese da formação',mods:[19,20]}
];

const PRINCIPAL_CAROUSELS={
 motivation:[
  {kicker:'POR QUE COMEÇAR',title:'Estudar com direção muda a forma de aprender.',text:'Uma formação rica não serve apenas para acumular conceitos. Ela organiza o raciocínio, dá vocabulário para compreender conflitos psíquicos e transforma curiosidade em estudo consistente.'},
  {kicker:'MOTIVAÇÃO',title:'Conhecimento profundo evita estudo superficial.',text:'Em vez de apenas ler tópicos soltos, o Instituto ADE conduz a pessoa por uma trilha articulada: história, teoria, técnica, crítica, prática simulada e revisão constante.'},
  {kicker:'VISÃO DE FUTURO',title:'O aprendizado se torna um patrimônio intelectual.',text:'Ao longo do curso, o estudante constrói repertório para ler melhor autores, identificar conceitos centrais e sustentar análises mais maduras.'},
  {kicker:'CONVITE',title:'Aprender aqui é criar uma disciplina de estudo.',text:'Cada módulo foi pensado para exigir leitura, reflexão, prova teórica e aplicação prática. Isso torna o processo mais sério, mais útil e mais memorável.'}
 ],
 benefits:[
  {kicker:'BENEFÍCIO',title:'Conteúdo amplo e progressivo',text:'O currículo foi estruturado para não ficar preso a resumos rasos. Há leitura guiada, atividades de consolidação, glossário, biblioteca e videoaulas incorporadas.'},
  {kicker:'BENEFÍCIO',title:'Clareza visual e trilha pedagógica',text:'A interface foi pensada para mostrar o próximo passo com facilidade: continuar aula, concluir módulo, realizar prova e acessar o Laboratório.'},
  {kicker:'BENEFÍCIO',title:'Aplicação prática com IA',text:'Depois de cada módulo, o estudante pode testar o que aprendeu em uma conversa simulada com paciente fictício e receber devolutiva pedagógica.'},
  {kicker:'BENEFÍCIO',title:'Estudo de longo prazo',text:'O sistema preserva progresso, organiza a jornada em ciclos e estimula continuidade. O resultado é um ambiente que ajuda a voltar ao estudo com menos atrito.'}
 ],
 transformations:[
  {kicker:'EXEMPLO REALISTA',title:'De leitor disperso a estudante organizado',text:'Uma pessoa que antes pulava de vídeo em vídeo passa a seguir uma ordem de estudo, fazer anotações, revisar conceitos e perceber evolução concreta.'},
  {kicker:'EXEMPLO REALISTA',title:'De curiosidade vaga a repertório conceitual',text:'Termos como inconsciente, recalque, pulsão, transferência e narcisismo deixam de ser palavras soltas e passam a funcionar como conceitos articulados.'},
  {kicker:'EXEMPLO REALISTA',title:'Da teoria abstrata à escuta aplicada',text:'Com as simulações, o estudante deixa de apenas repetir definições e começa a treinar escuta, formulação de hipóteses e manejo de falas em contexto.'},
  {kicker:'EXEMPLO REALISTA',title:'De consumo passivo a pensamento crítico',text:'Além de aprender autores e escolas, o estudante é convidado a discutir limites, críticas, ética e o lugar da Psicanálise no debate contemporâneo.'}
 ],
 quotes:[
  {kicker:'IDEIA-CENTRAL',title:'“Aprender melhor é aprender com percurso.”',text:'O Instituto ADE foi concebido para valorizar profundidade, continuidade e relação entre teoria e prática, em vez de apenas juntar conteúdos em sequência.'},
  {kicker:'IDEIA-CENTRAL',title:'“Ler muito não basta; é preciso ler com direção.”',text:'Por isso cada aula articula objetivos, corpo teórico, tarefas de consolidação, reflexão e materiais audiovisuais complementares.'},
  {kicker:'IDEIA-CENTRAL',title:'“A compreensão cresce quando o estudante é desafiado.”',text:'As avaliações teóricas e as simulações práticas existem para transformar estudo em domínio progressivo do raciocínio psicanalítico.'},
  {kicker:'IDEIA-CENTRAL',title:'“O conhecimento precisa ser habitável.”',text:'Uma boa plataforma precisa ser clara o suficiente para acolher, mas exigente o bastante para realmente formar.'}
 ]
};

function save(){localStorage.setItem(stateKey,JSON.stringify(state));render()}
function saveLab(){localStorage.setItem(labKey,JSON.stringify(lab))}
function savePrefs(){localStorage.setItem(prefsKey,JSON.stringify(prefs));applyPrefs()}
function applyPrefs(){document.documentElement.style.setProperty('--reader-scale',String(prefs.fontScale||1));document.body.classList.toggle('focus-mode',!!prefs.focus)}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function progress(){const lessons=state.doneLessons.length/totalLessons;const quizzes=state.passedQuizzes.length/totalModules;return Math.round(((lessons*.75)+(quizzes*.25))*100)}
function labSession(){return lab.activeSessionId?lab.sessions[lab.activeSessionId]:null}
function moduleTheoryComplete(mid){const m=COURSE.modules.find(x=>x.id===mid);return !!m&&m.lessons.every(l=>state.doneLessons.includes(l.id))&&state.passedQuizzes.includes(mid)}
function practicalStatus(mid){const attempts=Object.values(lab.sessions).filter(s=>s.moduleId===mid&&s.ended);if(!attempts.length)return {attempts:0,best:0,passed:false};const best=Math.max(...attempts.map(s=>s.score||0));return {attempts:attempts.length,best,passed:best>=70}}
function allComplete(){return state.doneLessons.length===totalLessons&&state.passedQuizzes.length===totalModules}
function moduleProgress(m){return Math.round(m.lessons.filter(l=>state.doneLessons.includes(l.id)).length/m.lessons.length*100)}
function currentModule(){return COURSE.modules.find(m=>!state.passedQuizzes.includes(m.id))||COURSE.modules[COURSE.modules.length-1]}
function currentLesson(m=currentModule()){return m.lessons.find(l=>!state.doneLessons.includes(l.id))||m.lessons[m.lessons.length-1]}
function getVideo(mid,lessonId){const set=VIDEO_SETS[mid]||[];if(!set.length)return null;const idx=Math.max(0,(parseInt(String(lessonId).split('.')[1]||'1',10)-1)%set.length);return set[idx]}
function cycleForModule(mid){return CYCLES.find(c=>c.mods.includes(mid))}
function profileAvatar(cls=''){return profile.photo?`<img class="profile-photo ${cls}" src="${profile.photo}" alt="Foto de perfil">`:`<span class="profile-initials ${cls}">AA</span>`}
function icon(name){const icons={principal:'✦',home:'⌂',course:'▤',lab:'◈',library:'⌘',certificate:'◇'};return icons[name]||'•'}
function navItem(id,label){return `<button class="rail-item ${view===id?'active':''}" data-nav="${id}"><span class="rail-icon">${icon(id)}</span><span>${label}</span></button>`}
function shell(content,opts={}){const focus=opts.focus||false;return `<div class="ade-shell ${focus?'lesson-shell':''}"><aside class="rail" id="sidebar"><button class="ade-seal" data-nav="principal" aria-label="Instituto ADE"><img src="ade-logo.png" alt="Logo Instituto ADE"></button><nav class="rail-nav">${navItem('principal','Principal')}${navItem('home','Início')}${navItem('course','Curso')}${navItem('cases','Laboratório')}${navItem('library','Biblioteca')}${navItem('certificate','Certificado')}</nav><div class="rail-bottom"><button class="rail-utility" id="openReader" title="Preferências de leitura">Aa</button><button class="rail-avatar profile-trigger ${view==='profile'?'active':''}" data-nav="profile" title="Meu perfil" aria-label="Abrir perfil">${profileAvatar()}</button></div></aside><div class="mobile-shade" id="overlay"></div><main class="stage"><header class="masthead ${focus?'minimal':''}"><button class="mobile-menu" id="menuBtn">☰</button><div class="mast-brand"><span class="gold-rule"></span><div><small>INSTITUTO ADE</small><strong>${opts.title||'Formação Livre em Psicanálise'}</strong></div></div>${focus?`<button class="quiet-button" data-nav="course">Sair da leitura</button>`:`<div class="mast-status"><span>${progress()}%</span><small>da jornada</small></div>`}</header><div class="stage-content">${content}</div></main><div class="reader-popover" id="readerPopover"><div class="reader-head"><strong>Leitura</strong><button id="closeReader">×</button></div><label>Tamanho do texto</label><div class="reader-buttons"><button data-font="-">A−</button><button data-font="reset">A</button><button data-font="+">A+</button></div><label class="toggle-row"><input type="checkbox" id="focusToggle" ${prefs.focus?'checked':''}><span>Modo foco nas aulas</span></label></div></div>`}

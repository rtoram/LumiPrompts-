window.onload = function() {
    loadLinks();
    loadIdeas();
    loadEvents();
    showSection('links'); // Abre a seção de Links por padrão
};

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(`${sectionId}-section`).classList.remove('hidden');
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    document.getElementById('theme-btn').textContent = 
        document.body.classList.contains('dark-theme') ? 'Mudar Tema' : 'Tema Escuro';
}

// Banco de Links
function addLink() {
    const linkInput = document.getElementById('link-input').value;
    const tagInput = document.getElementById('tag-input').value || 'Sem tag';
    if (linkInput) {
        const linkList = document.getElementById('link-list');
        const li = document.createElement('li');
        const favicon = `https://www.google.com/s2/favicons?domain=${linkInput}`;
        li.innerHTML = `<span><img src="${favicon}" alt="favicon" style="width:16px; height:16px; margin-right:5px;"> 
                        <a href="${linkInput}" target="_blank">${linkInput}</a> [${tagInput}] 
                        <input type="text" placeholder="Comentário" onblur="saveLinks()"></span>
                        <button onclick="this.parentElement.remove(); saveLinks();">Excluir</button>`;
        linkList.appendChild(li);
        saveLinks();
        document.getElementById('link-input').value = '';
        document.getElementById('tag-input').value = '';
    }
}

function saveLinks() {
    const linkList = document.getElementById('link-list').innerHTML;
    localStorage.setItem('links', linkList);
}

function loadLinks() {
    const savedLinks = localStorage.getItem('links');
    if (savedLinks) document.getElementById('link-list').innerHTML = savedLinks;
}

// Prompt de Ideias
function saveIdea() {
    const ideaInput = document.getElementById('idea-input').value;
    if (ideaInput) {
        const ideaList = document.getElementById('idea-list');
        const li = document.createElement('li');
        const timestamp = new Date().toLocaleString();
        li.innerHTML = `<span>${ideaInput} (${timestamp})</span>
                        <button onclick="this.parentElement.remove(); saveIdeas();">Excluir</button>`;
        ideaList.appendChild(li);
        saveIdeas();
        document.getElementById('idea-input').value = '';
    }
}

function saveIdeas() {
    const ideaList = document.getElementById('idea-list').innerHTML;
    localStorage.setItem('ideas', ideaList);
}

function loadIdeas() {
    const savedIdeas = localStorage.getItem('ideas');
    if (savedIdeas) document.getElementById('idea-list').innerHTML = savedIdeas;
}

// Calendário
function addEvent() {
    const eventDate = document.getElementById('event-date').value;
    const eventInput = document.getElementById('event-input').value;
    if (eventDate && eventInput) {
        const eventList = document.getElementById('event-list');
        const li = document.createElement('li');
        li.innerHTML = `<span>${eventDate}: ${eventInput}</span>
                        <button onclick="this.parentElement.remove(); saveEvents();">Excluir</button>`;
        eventList.appendChild(li);
        saveEvents();
        document.getElementById('event-date').value = '';
        document.getElementById('event-input').value = '';
    }
}

function saveEvents() {
    const eventList = document.getElementById('event-list').innerHTML;
    localStorage.setItem('events', eventList);
}

function loadEvents() {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) document.getElementById('event-list').innerHTML = savedEvents;
}

// Exportar e Imprimir por Seção
function exportSection(section) {
    const data = {};
    data[section] = localStorage.getItem(section);
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `banco-de-${section}.json`;
    a.click();
}

function printSection(section) {
    const sectionElement = document.getElementById(`${section}-section`);
    const printContent = sectionElement.innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(`
        <html>
        <head><title>Imprimir ${section}</title><style>${document.querySelector('style').innerHTML}</style></head>
        <body class="${document.body.className}">${printContent}</body>
        </html>
    `);
    win.document.close();
    win.print();
}

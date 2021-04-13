const $links = document.getElementById('links');


const generatePanel = link => `
<a class="flexy-panel" href="${link.url}">
    <h2 class="title">${link.title}</h2>
    <div class="description">${link.description}</div>
</a>`;

$links.innerHTML = LINKS.map(link => {
    return generatePanel(link);
}).join('')
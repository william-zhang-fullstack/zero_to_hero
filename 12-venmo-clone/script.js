const burgerBtn = document.getElementById('burger-btn');
const sidebar   = document.querySelectorAll('.sidebar')[0];
const overlay   = document.querySelectorAll('.overlay')[0];

const expandSidebar = event => {
    sidebar.style.width = '83%';
    overlay.style.opacity = '0.7';
};

burgerBtn.addEventListener('click', expandSidebar);


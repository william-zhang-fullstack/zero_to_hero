const navBtns   = document.querySelectorAll('#nav-menu button');
const burgerBtn = document.getElementById('burger-btn');
const sidebar   = document.querySelectorAll('.sidebar')[0];
const overlay   = document.querySelectorAll('.overlay')[0];

const expandSidebar = event => {
    sidebar.style.width = '83%';
    overlay.style.opacity = '0.7';
};

navBtns.forEach(btn => btn.addEventListener("click", event => {
    navBtns.forEach(btn => {
        if (btn === event.target) {
            btn.classList.add('selected');
        } else {
            console.log('removed');
            btn.classList.remove('selected');
        }
    });
}));

burgerBtn.addEventListener('click', expandSidebar);


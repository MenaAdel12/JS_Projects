let darkmode = window.localStorage.getItem('darkmode') || null;
const btnSwitchingMode = document.querySelector('#theme-switching');

const enableDarkMode = () => {
    darkmode = window.localStorage.getItem('darkmode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkMode = () => {
    darkmode = window.localStorage.getItem('darkmode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkmode', null);
}

btnSwitchingMode.addEventListener('click', () => {
    (darkmode !== 'active') ? enableDarkMode() : disableDarkMode();
});

if(darkmode === 'active')
    enableDarkMode();

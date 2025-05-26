import * as toggle from './toggle.js';

document.getElementById('menu-toggle').addEventListener('click', toggle.toggleMenu);
document.getElementById('login').addEventListener('click', toggle.loginPopUp);
document.getElementById('login-exit-button').addEventListener('click', toggle.exitLoginPopup);
document.getElementById('help-button').addEventListener('click', function(e) {
	e.preventDefault();
	window.location.href = "voluntariado.html";
});

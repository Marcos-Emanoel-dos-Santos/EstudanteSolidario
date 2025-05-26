import { toggleMenu, loginPopUp } from './toggle.js';

document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
document.getElementById('login').addEventListener('click', loginPopUp);
document.getElementById('help-button').addEventListener('click', function(e) {
	e.preventDefault();
	window.location.href = "voluntariado.html";
});

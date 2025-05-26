export function toggleMenu(){
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
}

export function loginPopUp(){
  const loginPopUp = document.getElementById('div-login');
  const overlay = document.getElementById('overlay');
  loginPopUp.classList.add('show');
  overlay.classList.add('show');
}

export function exitLoginPopup(){
  const loginPopUp = document.getElementById('div-login');
  const overlay = document.getElementById('overlay');
  loginPopUp.classList.remove('show');
  overlay.classList.remove('show');
}
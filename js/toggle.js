export function toggleMenu(){
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
}

export function loginPopUp(){
  const profile = document.getElementById('profile');
  const login = document.getElementById('login');
  const loginPopUp = document.getElementById('div-login');
  const overlay = document.getElementById('overlay');
  login.classList.add('hide');
  profile.classList.add('show');
  loginPopUp.classList.add('show');
  overlay.classList.add('show');
}

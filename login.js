import {login} from './data_model/authentication.js';

const token = localStorage.getItem('auth_token');

if (token) {
    window.location.href = "index.html";
}


document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const username = formData.get('username').trim();
  const password = formData.get('password').trim();

  login(username, password).then(data => {
    console.log(data);

    const token = localStorage.getItem('auth_token');
    if (token) {
    window.location.href = 'index.html';
    }

  });
});
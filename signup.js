import {usernames, signup} from './data_model/authentication.js';

const token = localStorage.getItem('auth_token');

if (token) {
    window.location.href = "product.html";
}

document.getElementById('signupForn').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const username = formData.get('username').trim();
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const phone = formData.get('phone_Number').trim();
  const password = formData.get('password').trim();
  const confirm_password = formData.get('confirm_password').trim();

  if (password !== confirm_password) {
    alert("Passwords do not match!");
    return;
  }

  usernames().then(existingUsernames => {
    const userExists = existingUsernames.some(u => u.username === username);
    if (userExists) {
        alert("Username already taken, please choose another.");
        return;
    }
  });
  signup(username, name, email, phone, password).then(data => {
    console.log(data);

    if (data) {
    window.location.href = 'login.html';
    }
    
  });
});
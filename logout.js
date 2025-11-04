const token = localStorage.getItem('auth_token');

if (!token) {
  window.location.href = 'login.html';
}

document.getElementById("current_user").textContent = localStorage.getItem("username");

document.getElementById('logoutForm').addEventListener('submit', function(event) {
  event.preventDefault();

  localStorage.removeItem('auth_token');
  localStorage.removeItem('username');

  window.location.href = 'login.html';
});

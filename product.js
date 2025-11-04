const token = localStorage.getItem('auth_token');

if (token) {
  document.getElementById("current_user").textContent = localStorage.getItem("username");
  document.getElementById("page_name").textContent = "Logout";
  document.getElementById("page_name").href = "logout.html";
}

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (isDark){
  document.getElementById('android_img').src = './assets/android.png'
  document.getElementById('desktop_img').src = './assets/desktop.png'
}

document.getElementById("current_year").textContent = `© ${new Date().getFullYear()}`;

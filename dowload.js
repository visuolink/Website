
const android_radio = document.getElementById('android_radio');
const desktop_radio = document.getElementById('desktop_radio');
const android_div = document.getElementById('android_block');
const desktop_div = document.getElementById('desktop_block');

document.addEventListener('DOMContentLoaded', function() {
  android_div.classList.add('d-none');
  desktop_div.classList.add('d-none');

  android_radio.addEventListener('change', function() {
    android_div.classList.remove('d-none');
    desktop_div.classList.add('d-none');
  });

  desktop_radio.addEventListener('change', function() {
    desktop_div.classList.remove('d-none');
    android_div.classList.add('d-none');
  });

  const params = new URLSearchParams(window.location.search);
  const platform = params.get('platform');

  if (platform === 'android') {
    android_radio.checked = true;
    android_div.classList.remove('d-none');
    desktop_div.classList.add('d-none');
  } else if (platform === 'desktop') {
    desktop_radio.checked = true;
    android_div.classList.add('d-none');
    desktop_div.classList.remove('d-none');
  }

  const token = localStorage.getItem('auth_token');
  if (!token) {
    window.location.href = 'login.html';
  } else {
    document.getElementById('current_user').textContent = localStorage.getItem('username');
  }

  document.getElementById("desktop_github_link").href = "https://github.com/visuolink/DesktopApp";
  document.getElementById("android_github_link").href = "https://github.com/visuolink/AndroidApp";

});



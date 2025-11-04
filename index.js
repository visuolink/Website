import { startApiMonitor} from './data_model/visuolink_client.js';

startApiMonitor("https://visuolinkapi.onrender.com/");

const token = localStorage.getItem('auth_token');

if (token) {
    document.getElementById("current_user").textContent = localStorage.getItem("username");
    document.getElementById("page_name").textContent = "Logout";
    document.getElementById("page_name").href = "logout.html";
}

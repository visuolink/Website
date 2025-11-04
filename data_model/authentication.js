import { startApiMonitor, VisuoLinkClient } from './visuolink_client.js';

const client = new VisuoLinkClient();

export async function usernames() {
    let data = await client.getUsernames();
    if (data) {
        return data;
    } else {
        return [];
    }
}

export async function login(username, password){
    let data = await client.doLogin(username, password)
    if (data) {
        localStorage.setItem("auth_token", data.id);
        localStorage.setItem("username", data.username);
    } else {
        alert("Login failed: invalid credentials or server error")
        return;
    }
}

export async function signup(username, name, email, phone, password) {
    let data = client.createUser(username, name, email, phone, password);
    if (data) {
        return data;
    } else {
        alert("User Creation failed - Unique Constaint invalided or server error")
        return;
    }
}

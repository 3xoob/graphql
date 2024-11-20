import { renderLoginPage } from "./loginPage";
// Function to render the logout button
export function renderLogoutBtn() {
    const app = document.getElementById("welcome_info");
    if (!app) {
        console.error("Profile container not found!");
        return;
    }

    const logoutButton = document.createElement("button");
    logoutButton.style.fontSize = "24px";
    logoutButton.classList.add("logout-button");

    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-sign-out");

    logoutButton.appendChild(icon);
    logoutButton.appendChild(document.createTextNode(" Logout"));

    logoutButton.onclick = logout;

    app.append(logoutButton);
}

// function to log out the user
export function logout() {
    localStorage.removeItem("jwt");
    renderLoginPage();
}

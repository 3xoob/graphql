import { createHomePage } from "./homePage";

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
    const token = localStorage.getItem("jwt");

    if (token) {
        fetch("https://learn.reboot01.com/api/auth/signout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Successfully signed out!");
                } else {
                    console.error("Error signing out:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Network error:", error);
            });
    } else {
        console.error("No JWT token found in localStorage.");
    }


    localStorage.removeItem("jwt");
    createHomePage();
}

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
export async function logout() {
    const token = localStorage.getItem("jwt");

    if (token) {
        try {
            const expireResponse = await fetch("https://learn.reboot01.com/api/auth/expire", {
                method: "GET",
                headers: {
                    "x-jwt-token": token,
                },
            });

            if (!expireResponse.ok) {
                const expireData = await expireResponse.json();
                console.error("Error expiring token:", expireData);
                return;
            }

            const signoutResponse = await fetch("https://learn.reboot01.com/api/auth/signout", {
                method: "POST",
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            if (signoutResponse.ok) {
                console.log("Successfully signed out!");
            } else {
                const signoutData = await signoutResponse.json();
                console.error("Error signing out:", signoutData);
            }
        } catch (error) {
            console.error("Network error:", error);
        }

        localStorage.removeItem("jwt");

        createHomePage();
    } else {
        console.error("No JWT token found in localStorage.");
    }
}

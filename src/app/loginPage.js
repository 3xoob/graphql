import { renderProfilePage } from './profilePage';
// Function to handle login authentication
export async function authenticateUser(username, password) {
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);
    try {
        const response = await fetch("https://learn.reboot01.com/api/auth/signin", {
            method: "POST",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            console.log(response);
            const token = await response.text();
            console.log(token);
            if (token) {
                const cleanToken = token.replace(/^"(.*)"$/, "$1");
                localStorage.setItem("jwt", cleanToken);
                return null;
            }
            else {
                return "Login successful, but no token received.";
            }
        }
        else {
            const errorText = await response.text();
            return errorText;
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        return "An error occurred. Please try again.";
    }
}
// Function to Render login page
export function renderLoginPage() {
    const app = document.getElementById("app");
    if (!app) {
        console.error("App container not found!");
        return;
    }
    app.innerHTML = '';
    const LoginPage = document.createElement("div");
    LoginPage.className = "LoginPage";
    const ring = document.createElement("div");
    ring.className = "ring";
    const i1 = document.createElement("i");
    i1.style.setProperty("--clr", "#4070f4");
    const i2 = document.createElement("i");
    i2.style.setProperty("--clr", "#30a091");
    const i3 = document.createElement("i");
    i3.style.setProperty("--clr", "#a8438f");
    const login = document.createElement("div");
    login.className = "login";
    const loginHeading = document.createElement("h2");
    loginHeading.textContent = "Login";
    const form = document.createElement("form");
    form.action = "#";
    form.method = "POST";
    const inputBx1 = document.createElement("div");
    inputBx1.className = "inputBx";
    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.name = "username";
    usernameInput.placeholder = "Username | Email";
    inputBx1.appendChild(usernameInput);
    const inputBx2 = document.createElement("div");
    inputBx2.className = "inputBx";
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.placeholder = "Password";
    inputBx2.appendChild(passwordInput);
    const inputBx3 = document.createElement("div");
    inputBx3.className = "inputBx";
    const submitInput = document.createElement("input");
    submitInput.type = "submit";
    submitInput.value = "Login";
    inputBx3.appendChild(submitInput);
    const ErrorOutput = document.createElement("div");
    ErrorOutput.className = "ErrorOutput";
    const Errmsg = document.createElement("span");
    Errmsg.id = "Errmsg";
    Errmsg.textContent = "";
    ErrorOutput.appendChild(Errmsg);
    form.append(inputBx1, inputBx2, inputBx3, ErrorOutput);
    login.append(loginHeading, form);
    ring.append(i1, i2, i3, login);
    LoginPage.append(ring);
    app.append(LoginPage);
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        const loginError = await authenticateUser(username, password);
        if (loginError) {
            try {
                const errorMessage = JSON.parse(loginError).error;
                Errmsg.textContent = errorMessage;
            }
            catch (e) {
                console.error("Error parsing login error:", e);
                Errmsg.textContent = "An unexpected error occurred.";
            }
        }
        else {
            history.pushState(null, "", "/profile");
            renderProfilePage();
        }
    });
}

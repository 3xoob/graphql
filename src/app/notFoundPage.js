"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNotFoundPage = renderNotFoundPage;
// Function to render a custom 404 error page
function renderNotFoundPage() {
    const app = document.getElementById("app");
    if (!app) {
        console.error("App container not found!");
        return;
    }
    app.innerHTML = '';
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";
    const errorOp = document.createElement("div");
    errorOp.className = "error-op";
    const heading = document.createElement("h1");
    heading.textContent = "Oops!";
    errorOp.appendChild(heading);
    const errorCode = document.createElement("p");
    errorCode.textContent = "404 - ERROR";
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Page Not Found";
    const goBackButton = document.createElement("button");
    goBackButton.id = "errorb";
    goBackButton.textContent = "Go to Main Page";
    goBackButton.onclick = () => window.location.href = "/";
    errorContainer.append(errorOp, errorCode, errorMessage, goBackButton);
    app.append(errorContainer);
}

import { createHomePage } from "./homePage";
import { renderLoginPage } from "./loginPage";
import { renderProfilePage } from "./profilePage";
import { renderNotFoundPage } from "./notFoundPage";
const base = location.href;

// Function to render the page based on the current path
export function renderPage() {
    const path = location.pathname;
    if ((base + path) === (base + "/profile")) {
        renderProfilePage();
    } else if ((base + path) === (base + "/login")) {
        renderLoginPage();
    } else if ((base + path) === (base + "/")) {
        createHomePage();
    } else {
        renderNotFoundPage();
    }
    console.log(base + path)
}

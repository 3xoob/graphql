import { createHomePage } from "./homePage";
import { renderLoginPage } from "./loginPage";
import { renderProfilePage } from "./profilePage";
import { renderNotFoundPage } from "./notFoundPage";
// Function to render the page based on the current path
export function renderPage() {
    const path = location.pathname;
    if (path === "/profile") {
        renderProfilePage();
    }
    else if (path === "/login") {
        renderLoginPage();
    }
    else if (path === "/") {
        createHomePage();
    }
    else {
        renderNotFoundPage();
    }
}
//# sourceMappingURL=router.js.map
import { renderPage } from "./app/router";
window.addEventListener("popstate", () => {
    renderPage();
});
renderPage();
//# sourceMappingURL=main.js.map
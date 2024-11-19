"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./app/router");
window.addEventListener("popstate", () => {
    (0, router_1.renderPage)();
});
(0, router_1.renderPage)();

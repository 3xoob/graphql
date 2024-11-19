"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPage = renderPage;
const homePage_1 = require("./homePage");
const loginPage_1 = require("./loginPage");
const profilePage_1 = require("./profilePage");
const notFoundPage_1 = require("./notFoundPage");
// Function to render the page based on the current path
function renderPage() {
    const path = location.pathname;
    if (path === "/profile") {
        (0, profilePage_1.renderProfilePage)();
    }
    else if (path === "/login") {
        (0, loginPage_1.renderLoginPage)();
    }
    else if (path === "/") {
        (0, homePage_1.createHomePage)();
    }
    else {
        (0, notFoundPage_1.renderNotFoundPage)();
    }
}

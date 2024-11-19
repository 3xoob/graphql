"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderProfilePage = renderProfilePage;
exports.renderUI = renderUI;
const loginPage_1 = require("./loginPage");
const userInfo_1 = require("./userInfo");
const skillChart_1 = require("./skillChart");
const auditCard_1 = require("./auditCard");
const UserRank_1 = require("./UserRank");
const auditTable_1 = require("./auditTable");
const xpCard_1 = require("./xpCard");
const logoutBtn_1 = require("./logoutBtn");
const queries_1 = require("./queries");
// Fetch and display user information with access control
async function renderProfilePage() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || jwt.split(".").length !== 3) {
        history.pushState(null, "", "/login");
        (0, loginPage_1.renderLoginPage)();
        return;
    }
    const app = document.getElementById("app");
    if (!app) {
        console.error("App container not found!");
        return;
    }
    app.innerHTML = '';
    try {
        const response = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: queries_1.GET_USER_INFO,
            }),
        });
        if (!response.ok) {
            app.innerHTML += '<p>Error: Failed to fetch user data.</p>';
            return;
        }
        const result = await response.json();
        if (result.errors) {
            console.error("GraphQL Errors:", result.errors);
            app.innerHTML += '<p>Error: GraphQL Errors occurred.</p>';
            return;
        }
        const userInfo = result.data?.user;
        if (Array.isArray(userInfo) && userInfo.length > 0) {
            const userAttributes = userInfo[0].attrs;
            userAttributes.username = userInfo[0].login;
            userAttributes.campus = userInfo[0].campus;
            renderUI(userAttributes);
        }
        else {
            app.innerHTML += '<p>No user info found.</p>';
        }
    }
    catch (error) {
        console.error("Error fetching user info:", error);
        app.innerHTML += '<p>Error: Unable to fetch user info.</p>';
    }
}
// Function to render all the cards of the user (UI)
async function renderUI(user) {
    const app = document.getElementById("app");
    if (!app) {
        console.error("App container not found!");
        return;
    }
    const ProfileContainer = document.createElement("div");
    ProfileContainer.className = "ProfileContainer";
    ProfileContainer.id = "ProfileContainer";
    app.innerHTML = '';
    app.append(ProfileContainer);
    const welcome_info = document.createElement("div");
    welcome_info.id = "welcome_info";
    ProfileContainer.append(welcome_info);
    const topDiv = document.createElement("div");
    topDiv.id = "topDiv";
    ProfileContainer.append(topDiv);
    const lowDiv = document.createElement("div");
    lowDiv.id = "lowDiv";
    ProfileContainer.append(lowDiv);
    (0, userInfo_1.renderProfileCard)(user);
    (0, logoutBtn_1.renderLogoutBtn)();
    (0, UserRank_1.displayRankCard)();
    const TwoElem = document.createElement("div");
    TwoElem.id = "TwoElem";
    topDiv.append(TwoElem);
    (0, auditTable_1.renderAuditTable)();
    (0, auditCard_1.renderAuditCard)();
    (0, xpCard_1.renderXPCard)();
    (0, skillChart_1.renderSkillsCharts)();
}

import { renderLoginPage } from "./loginPage";
import { renderProfileCard } from "./userInfo";
import { renderSkillsCharts } from "./skillChart"
import { renderAuditCard } from "./auditCard";
import { displayRankCard } from "./UserRank"
import { renderAuditTable } from "./auditTable"
import { renderXPCard } from "./xpCard";
import { renderLogoutBtn } from "./logoutBtn";
import { UserAttributes } from "../types";
import { GET_USER_INFO } from "./queries";

// Fetch and display user information with access control
export async function renderProfilePage() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || jwt.split(".").length !== 3) {
        renderLoginPage();
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
                query: GET_USER_INFO,
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
            userAttributes.username = userInfo[0].login
            userAttributes.campus = userInfo[0].campus
            renderUI(userAttributes);
        } else {
            app.innerHTML += '<p>No user info found.</p>';
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        app.innerHTML += '<p>Error: Unable to fetch user info.</p>';
    }
}

// Function to render all the cards of the user (UI)
export async function renderUI(user: UserAttributes) {
    const app = document.getElementById("app");
    if (!app) {
        console.error("App container not found!");
        return;
    }

    const ProfileContainer = document.createElement("div");
    ProfileContainer.className = "ProfileContainer";
    ProfileContainer.id = "ProfileContainer"

    app.innerHTML = '';
    app.append(ProfileContainer)

    const welcome_info = document.createElement("div");
    welcome_info.id = "welcome_info";

    ProfileContainer.append(welcome_info);

    const topDiv = document.createElement("div");
    topDiv.id = "topDiv";
    ProfileContainer.append(topDiv);

    const lowDiv = document.createElement("div");
    lowDiv.id = "lowDiv";

    ProfileContainer.append(lowDiv);

    renderProfileCard(user);
    renderLogoutBtn();
    displayRankCard();

    const TwoElem = document.createElement("div");
    TwoElem.id = "TwoElem";
    topDiv.append(TwoElem);

    renderAuditTable();
    renderAuditCard();
    renderXPCard();
    renderSkillsCharts();
}

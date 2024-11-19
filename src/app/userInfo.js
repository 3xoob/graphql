"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderProfileCard = renderProfileCard;
const helpers_1 = require("./helpers");
// Function to display user information card
function renderProfileCard(user) {
    const appD = document.getElementById("welcome_info");
    if (!appD) {
        console.error("Profile container not found!");
        return;
    }
    const app = document.getElementById("topDiv");
    if (!app) {
        console.error("Profile container not found!");
        return;
    }
    const welcomeMessage = document.createElement("h2");
    welcomeMessage.textContent = `Welcome, ${user.firstName ?? ''} ${user.lastName ?? ''}!`;
    welcomeMessage.classList.add("welcome-message");
    appD.append(welcomeMessage);
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    const left = document.createElement("div");
    left.classList.add("left");
    const userName = document.createElement("h4");
    userName.textContent = `👤 ${user.firstName ?? 'N/A'} ${user.lastName ?? 'N/A'}`.trim();
    left.appendChild(userName);
    const usernameField = document.createElement("p");
    usernameField.textContent = `📛 Username: ${user.username ?? 'N/A'}`;
    left.appendChild(usernameField);
    const campusField = document.createElement("p");
    campusField.textContent = `📍 Campus: ${user.campus ?? 'N/A'}`;
    left.appendChild(campusField);
    const userRole = document.createElement("p");
    userRole.textContent = `🎓 Qualification: ${user.qualification ?? "No qualification provided"}`;
    left.appendChild(userRole);
    const right = document.createElement("div");
    right.classList.add("right");
    const info = document.createElement("div");
    info.classList.add("info");
    const infoTitle = document.createElement("h3");
    infoTitle.textContent = "Information";
    const infoData = document.createElement("div");
    infoData.classList.add("info_data");
    infoData.appendChild((0, helpers_1.createDataElementHead)("📩 Email", user.email ?? "N/A"));
    infoData.appendChild((0, helpers_1.createDataElementHead)("📞 Phone", user.PhoneNumber ?? "N/A"));
    infoData.appendChild((0, helpers_1.createDataElementHead)("🌍 Country", user.addressCountry ?? "N/A"));
    infoData.appendChild((0, helpers_1.createDataElementHead)("⚧️ Gender", user.genders ?? "N/A"));
    infoData.appendChild((0, helpers_1.createDataElementHead)("🆔 CPR Number", user.CPRnumber ?? "N/A"));
    infoData.appendChild((0, helpers_1.createDataElementHead)("🎂 Date of Birth", (0, helpers_1.formatDate)(user.dateOfBirth) ?? "N/A"));
    infoData.appendChild((0, helpers_1.createDataElementHead)("📜 Degree", user.Degree ?? "N/A"));
    info.appendChild(infoTitle);
    info.appendChild(infoData);
    right.appendChild(info);
    wrapper.appendChild(left);
    wrapper.appendChild(right);
    app.append(wrapper);
}
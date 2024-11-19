"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSize = formatSize;
exports.createDataElement = createDataElement;
exports.createMediaLink = createMediaLink;
exports.createDataElementHead = createDataElementHead;
exports.formatDate = formatDate;
exports.processUserSkillsData = processUserSkillsData;
exports.getAuditNameFromPath = getAuditNameFromPath;
exports.reverseAudits = reverseAudits;
// Helper function to format the data size
function formatSize(sizeInBytes) {
    if (sizeInBytes >= 1e9) {
        return `${(sizeInBytes / 1e9).toFixed(2)} GB`;
    }
    else if (sizeInBytes >= 1e6) {
        return `${(sizeInBytes / 1e6).toFixed(2)} MB`;
    }
    else if (sizeInBytes >= 1e3) {
        return `${(sizeInBytes / 1e3).toFixed(2)} KB`;
    }
    else {
        return `${sizeInBytes} B`;
    }
}
// Helper function to create individual data elements
function createDataElement(label, value) {
    const dataContainer = document.createElement("span");
    const labelElement = document.createElement("span");
    labelElement.textContent = label;
    const valueElement = document.createElement("span");
    valueElement.textContent = value;
    dataContainer.appendChild(labelElement);
    dataContainer.appendChild(valueElement);
    return dataContainer;
}
// Helper function to create media buttons
function createMediaLink(href, iconClass, backgroundColor) {
    const link = document.createElement("a");
    link.href = href;
    link.className = "link";
    link.style.backgroundColor = backgroundColor;
    link.target = "_blank";
    const icon = document.createElement("i");
    icon.className = iconClass;
    link.appendChild(icon);
    return link;
}
// Helper function to create data elements
function createDataElementHead(label, value) {
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data");
    const title = document.createElement("h4");
    title.textContent = label;
    const content = document.createElement("p");
    content.textContent = value;
    dataContainer.appendChild(title);
    dataContainer.appendChild(content);
    return dataContainer;
}
// Helper function to format the date to 'YYYY-MM-DD'
function formatDate(dateString) {
    if (!dateString)
        return "N/A";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
}
// Helper function process the data of user skills
function processUserSkillsData(userSkill) {
    const amounts = [];
    const types = [];
    if (Array.isArray(userSkill)) {
        userSkill.forEach((skill) => {
            amounts.push(skill.amount);
            types.push(skill.type.replace("skill_", ""));
        });
    }
    else {
        console.error("Invalid data: 'transaction' is undefined or not an array.");
    }
    return [amounts, types];
}
// Helper function to get the last segment of the path
function getAuditNameFromPath(path) {
    if (!path) {
        return '';
    }
    const parts = path.split("/");
    return parts[parts.length - 1] || '';
}
// Helper function to everses the order of audits from earliest to oldest
function reverseAudits(auditStatus) {
    const reversedValidAudits = [...auditStatus.validAudits.nodes].reverse();
    const reversedFailedAudits = [...auditStatus.failedAudits.nodes].reverse();
    return {
        ...auditStatus,
        validAudits: {
            ...auditStatus.validAudits,
            nodes: reversedValidAudits
        },
        failedAudits: {
            ...auditStatus.failedAudits,
            nodes: reversedFailedAudits
        }
    };
}

import { IUserSkill, IAuditStatus } from "../types";
// Helper function to format the data size
export function formatSize(sizeInBytes: number): string {
    if (sizeInBytes >= 1e9) {
        return `${(sizeInBytes / 1e9).toFixed(2)} GB`;
    } else if (sizeInBytes >= 1e6) {
        return `${(sizeInBytes / 1e6).toFixed(2)} MB`;
    } else if (sizeInBytes >= 1e3) {
        return `${(sizeInBytes / 1e3).toFixed(2)} KB`;
    } else {
        return `${sizeInBytes} B`;
    }
}

// Helper function to create individual data elements
export function createDataElement(label: string, value: string): HTMLElement {
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
export function createMediaLink(href: string, iconClass: string, backgroundColor: string): HTMLAnchorElement {
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
export function createDataElementHead(label: string, value: string): HTMLElement {
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
export function formatDate(dateString: any): string | undefined {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
}

// Helper function process the data of user skills
export function processUserSkillsData(userSkill: IUserSkill): [number[], string[]] {
    const amounts: number[] = [];
    const types: string[] = [];

    if (Array.isArray(userSkill)) {
        userSkill.forEach((skill) => {
            amounts.push(skill.amount);
            types.push(skill.type.replace("skill_", ""));
        });
    } else {
        console.error("Invalid data: 'transaction' is undefined or not an array.");
    }

    return [amounts, types];
}

// Helper function to get the last segment of the path
export function getAuditNameFromPath(path: string): string {
    if (!path) {
        return '';
    }

    const parts = path.split("/");

    return parts[parts.length - 1] || '';
}

// Helper function to everses the order of audits from earliest to oldest
export function reverseAudits(auditStatus: IAuditStatus): IAuditStatus {
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


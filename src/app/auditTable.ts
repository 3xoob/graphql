import { getAuditNameFromPath, reverseAudits } from "./helpers";
import { GraphQLService } from "./dataFetching";

// Function to render the audit table
export async function renderAuditTable() {
    const graphQLService = new GraphQLService();
    let [auditStatus, Aerror] = await graphQLService.getAuditStatus();
    if (Aerror !== null) {
        console.error(Aerror);
    }

    if (auditStatus) {
        auditStatus = reverseAudits(auditStatus)
    }

    const app = document.getElementById("lowDiv");
    if (!app) {
        console.error("Profile container not found!");
        return;
    }

    const auditCard = document.createElement("div");
    auditCard.classList.add("audit-card-table");

    const title = document.createElement("h2");
    title.textContent = "Audit";
    auditCard.appendChild(title);

    const auditTable = document.createElement("div");
    auditTable.classList.add("audit-table");

    const passedColumn = document.createElement("div");
    passedColumn.classList.add("column");

    const passedTitle = document.createElement("h3");
    passedTitle.textContent = "Passed Audits";
    passedColumn.appendChild(passedTitle);

    const passedColumn_col = document.createElement("div");
    passedColumn_col.classList.add("column-2");
    passedColumn.append(passedColumn_col);

    if (auditStatus) {
        auditStatus.validAudits.nodes.forEach(audit => {
            const auditItem = document.createElement("div");
            auditItem.classList.add("audit-item", "pass");
            const auditName = getAuditNameFromPath(audit.group.path);
            auditItem.textContent = `${auditName} (${audit.group.captainLogin})`;
            passedColumn_col.appendChild(auditItem);
        });
    }

    const failedColumn = document.createElement("div");
    failedColumn.classList.add("column");

    const failedTitle = document.createElement("h3");
    failedTitle.textContent = "Failed Audits";
    failedColumn.appendChild(failedTitle);

    const failedColumn_col = document.createElement("div");
    failedColumn_col.classList.add("column-2");
    failedColumn.append(failedColumn_col);

    if (auditStatus) {
        auditStatus.failedAudits.nodes.forEach(audit => {
            const auditItem = document.createElement("div");
            auditItem.classList.add("audit-item", "fail");
            const auditName = getAuditNameFromPath(audit.group.path);
            auditItem.textContent = `${auditName} (${audit.group.captainLogin})`;
            failedColumn_col.appendChild(auditItem);
        });
    }

    auditTable.appendChild(passedColumn);
    auditTable.appendChild(failedColumn);
    auditCard.appendChild(auditTable);
    app.append(auditCard);
}

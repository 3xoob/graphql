import { GraphQLService } from "./dataFetching";
import { formatSize, createDataElement } from "./helpers";
const graphQLService = new GraphQLService();
// Function to render the audit card
export async function renderAuditCard() {
    const [auditRatio, Rerror] = await graphQLService.getAuditRatio();
    if (Rerror !== null) {
        console.error(Rerror);
        return;
    }
    let data = null;
    if (auditRatio.auditRatio && auditRatio.totalUp && auditRatio.totalDown) {
        data = {
            ratio: auditRatio.auditRatio,
            done: auditRatio.totalUp,
            received: auditRatio.totalDown,
        };
    }
    const app = document.getElementById("TwoElem");
    if (!app) {
        console.error("Profile container not found!");
        return;
    }
    const auditCard = document.createElement("div");
    auditCard.classList.add("audit-card");
    const title = document.createElement("h2");
    title.textContent = "Audits Ratio";
    auditCard.appendChild(title);
    const barContainerDone = document.createElement("div");
    barContainerDone.classList.add("bar-container");
    const labelDone = document.createElement("span");
    labelDone.textContent = "Done";
    labelDone.classList.add("progress-label");
    const progressBarDone = document.createElement("div");
    progressBarDone.classList.add("progress-bar");
    const barContainerReceived = document.createElement("div");
    barContainerReceived.classList.add("bar-container");
    const labelReceived = document.createElement("span");
    labelReceived.textContent = "Received";
    labelReceived.classList.add("progress-label");
    const progressBarReceived = document.createElement("div");
    progressBarReceived.classList.add("progress-bar");
    if (data !== null) {
        const progressBarDone = document.createElement("progress");
        progressBarDone.id = "done-progress";
        progressBarDone.value = data.done;
        progressBarDone.max = data.done + data.received;
        barContainerDone.appendChild(progressBarDone);
        const progressBarReceived = document.createElement("progress");
        progressBarReceived.id = "received-progress";
        progressBarReceived.value = data.received;
        progressBarReceived.max = data.done + data.received;
        barContainerReceived.appendChild(progressBarReceived);
    }
    barContainerDone.appendChild(labelDone);
    barContainerDone.appendChild(progressBarDone);
    auditCard.appendChild(barContainerDone);
    barContainerReceived.appendChild(labelReceived);
    barContainerReceived.appendChild(progressBarReceived);
    auditCard.appendChild(barContainerReceived);
    const dataValues = document.createElement("div");
    dataValues.classList.add("data-values");
    if (data !== null) {
        dataValues.appendChild(createDataElement("Done ⬆", formatSize(data.done)));
        dataValues.appendChild(createDataElement("Received ⬇", formatSize(data.received)));
    }
    auditCard.appendChild(dataValues);
    const ratioDisplay = document.createElement("div");
    ratioDisplay.classList.add("ratio-display");
    if (data !== null) {
        const checker = Math.round(data.ratio * 10) / 10;
        ratioDisplay.textContent = data.ratio.toFixed(1);
        if (checker <= 0.6) {
            ratioDisplay.style.color = "#FF0000";
        }
        else if (checker <= 1.4) {
            ratioDisplay.style.color = "#f3c41b";
        }
        else {
            ratioDisplay.style.color = "#0000FF";
        }
    }
    auditCard.appendChild(ratioDisplay);
    const hint = document.createElement("p");
    hint.classList.add("hint");
    if (data !== null) {
        const checker = Math.round(data.ratio * 10) / 10;
        if (checker <= 0.6) {
            hint.textContent = "Careful buddy!";
            hint.style.color = "#FF0000";
        }
        else if (checker <= 0.9) {
            hint.textContent = "Getting there!";
            hint.style.color = "#f3c41b";
        }
        else if (checker <= 1.4) {
            hint.textContent = "Good job!";
            hint.style.color = "#f3c41b";
        }
        else {
            hint.textContent = "Excellent work!";
            hint.style.color = "#0000FF";
        }
    }
    auditCard.appendChild(hint);
    app.append(auditCard);
}

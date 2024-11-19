"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayRankCard = displayRankCard;
const dataFetching_1 = require("./dataFetching");
// Rank data with level ranges
const ranks = [
    { minLevel: 0, maxLevel: 9, title: "Aspiring developer" },
    { minLevel: 10, maxLevel: 19, title: "Beginner developer" },
    { minLevel: 20, maxLevel: 29, title: "Apprentice developer" },
    { minLevel: 30, maxLevel: 39, title: "Assistant developer" },
    { minLevel: 40, maxLevel: 49, title: "Basic developer" },
    { minLevel: 50, maxLevel: 54, title: "Junior developer" },
    { minLevel: 55, maxLevel: 59, title: "Confirmed developer" },
    { minLevel: 60, maxLevel: 60, title: "Full-Stack developer" },
];
// Function to get current rank and next rank based on the user's level
function getRankInfo(level) {
    let currentRank = ranks[0];
    let nextRank = null;
    for (let i = 0; i < ranks.length; i++) {
        const rank = ranks[i];
        if (rank && (level >= rank.minLevel && level <= rank.maxLevel)) {
            currentRank = rank;
            const nextRankto = ranks[i + 1];
            if (nextRankto) {
                nextRank = nextRankto;
                break;
            }
        }
    }
    return [{ currentRank, nextRank }, null];
}
// Function to render and display rank card
async function displayRankCard() {
    const graphQLService = new dataFetching_1.GraphQLService();
    const [topTransaction, Terror] = await graphQLService.getTopTransaction();
    if (Terror !== null) {
        console.error(Terror);
    }
    let level = 0;
    if (topTransaction && topTransaction.amount) {
        level = topTransaction.amount;
    }
    const [rankInfo, err] = getRankInfo(level);
    if (err) {
        console.error(err);
        return;
    }
    const app = document.getElementById("topDiv");
    if (!app) {
        console.error("Profile container not found!");
        return;
    }
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("rank-card");
    const currentRankEl = document.createElement("div");
    currentRankEl.classList.add("current-rank");
    currentRankEl.textContent = rankInfo.currentRank.title;
    cardContainer.appendChild(currentRankEl);
    const nextRankEl = document.createElement("div");
    nextRankEl.classList.add("next-rank");
    nextRankEl.textContent = rankInfo.nextRank
        ? `Next rank in ${rankInfo.nextRank.minLevel - level} levels`
        : "You have reached the highest rank!";
    cardContainer.appendChild(nextRankEl);
    const levelContainer = document.createElement("div");
    levelContainer.classList.add("level-container");
    const levelCircle = document.createElement("div");
    levelCircle.classList.add("level-circle");
    levelCircle.textContent = `Level ${level}`;
    levelContainer.appendChild(levelCircle);
    cardContainer.appendChild(levelContainer);
    const seeAllRanksButton = document.createElement("button");
    seeAllRanksButton.textContent = "See all ranks";
    seeAllRanksButton.addEventListener("click", () => showAllRanks(level));
    cardContainer.appendChild(seeAllRanksButton);
    app.append(cardContainer);
}
// Function to show all ranks functionality
function showAllRanks(level) {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const popup = document.createElement("div");
    popup.classList.add("popup-card");
    const title = document.createElement("h3");
    title.textContent = "All Ranks";
    popup.appendChild(title);
    const timeline = document.createElement("div");
    timeline.classList.add("timeline");
    ranks.forEach((rank, index) => {
        const timelineStep = document.createElement("div");
        timelineStep.classList.add("timeline-step");
        const [rankInfo, err] = getRankInfo(level);
        if (err) {
            console.error(err);
            return;
        }
        let tit = rankInfo.currentRank.title;
        if (rank.title === tit) {
            timelineStep.classList.add("current");
        }
        const stepContent = document.createElement("div");
        stepContent.classList.add("timeline-content");
        if (rank.minLevel == 60) {
            stepContent.textContent = `${rank.title} (Level ${rank.minLevel})`;
        }
        else {
            stepContent.textContent = `${rank.title} (Level ${rank.minLevel}-${rank.maxLevel})`;
        }
        timelineStep.appendChild(stepContent);
        timeline.appendChild(timelineStep);
        if (index < ranks.length - 1) {
            const line = document.createElement("div");
            line.classList.add("timeline-line");
            timeline.appendChild(line);
        }
    });
    popup.appendChild(timeline);
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        overlay.remove();
    });
    popup.appendChild(closeButton);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

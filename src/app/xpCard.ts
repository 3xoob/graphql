import { ITotalXp } from "../types";
import { GraphQLService } from "./dataFetching";
import { formatSize } from "./helpers";

// Function to render the XP card
export async function renderXPCard() {
    const app = document.getElementById('TwoElem');
    if (!app) {
        console.error('Profile container not found!');
        return;
    }

    const graphQLService = new GraphQLService();

    const [totalXPResponse, Xerror] = await graphQLService.getTotalXP();

    if (Xerror !== null) {
        console.error(Xerror);
        return;
    }

    const totalXP: ITotalXp = totalXPResponse;
    const xpAmount: number = totalXP.aggregate.sum.amount;

    const xpCard = document.createElement('div');
    xpCard.classList.add('xp-card');

    const title = document.createElement('h2');
    title.textContent = 'User XP';
    xpCard.appendChild(title);

    const xpValueElement = document.createElement('p');
    xpValueElement.classList.add('xp-value');
    xpValueElement.textContent = formatSize(xpAmount);
    xpCard.appendChild(xpValueElement);

    const xpMessageElement = document.createElement('p');
    xpMessageElement.classList.add('xp-message');

    if (xpAmount >= 1e9) {
        xpMessageElement.textContent = "You're a master!";
    } else if (xpAmount >= 5e8) {
        xpMessageElement.textContent = "Almost there, keep going!";
    } else if (xpAmount >= 1e6) {
        xpMessageElement.textContent = "Great job, you're progressing!";
    } else {
        xpMessageElement.textContent = "Keep up the great work!";
    }

    xpCard.appendChild(xpMessageElement);

    app.append(xpCard);
}

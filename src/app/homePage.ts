import { renderLoginPage } from "./loginPage";
import { createMediaLink } from "./helpers";

// Function to render the home page
export function createHomePage() {
    const app = document.getElementById("app");

    if (!app) {
        console.error("App container not found!");
        return;
    }

    app.innerHTML = '';

    const HomeContainer = document.createElement("div");
    HomeContainer.className = "HomeContainer";

    const header = document.createElement("div");
    header.className = "header";

    const verticalLine = document.createElement("div");
    verticalLine.className = "vertical-line";

    const textContainer = document.createElement("div");
    textContainer.className = "text";

    const text1 = document.createElement("div");
    text1.className = "text-1";
    text1.textContent = "GRAPHQL";

    const text3 = document.createElement("div");
    text3.className = "text-3";
    text3.textContent = "by Ali";

    const text2 = document.createElement("div");
    text2.className = "text-2";
    text2.textContent = "A profile page built with GraphQL to display user-specific data, such as XP, grades, and audits. Includes interactive SVG-based graphs to visualize achievements and a secure login with JWT for data access.";

    const tryButton = document.createElement("button");
    tryButton.className = "button";
    tryButton.textContent = "Try it!";
    tryButton.addEventListener("click", () => {
        history.pushState(null, "", "/login");
        renderLoginPage();
    });

    textContainer.append(text1, text3, text2, tryButton);
    header.append(verticalLine, textContainer);

    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "image";

    const profileImage = document.createElement("img");
    profileImage.src = "/Images/profile.jpg";
    profileImage.alt = "Profile Image";
    profileImage.className = "profile-img";

    imageContainer.appendChild(profileImage);

    const textData = document.createElement("div");
    textData.className = "text-data";

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = "Ali AbdulHussain";

    const job = document.createElement("span");
    job.className = "job";
    job.textContent = "Computer Engineer & Full Stack Developer";

    textData.append(name, job);

    const mediaButtons = document.createElement("div");
    mediaButtons.className = "media-buttons";

    const linkedinLink = createMediaLink("https://www.linkedin.com/in/aliabdulhussain3", "bx bxl-linkedin", "#4267b2");
    const emailLink = createMediaLink("mailto:ali.almoumnin@gmail.com?subject=FeedBack", "fa fa-envelope", "#e1306c");
    const phoneLink = createMediaLink("tel:+97337798824", "fa fa-phone", "#1da1f2");

    mediaButtons.append(linkedinLink, emailLink, phoneLink);

    const analytics = document.createElement("div");
    analytics.className = "analytics";

    const details = document.createElement("span");
    details.className = "Details";
    details.textContent = "Feel free to contact me and leave feedback!";
    analytics.appendChild(details);

    profileCard.append(imageContainer, textData, mediaButtons, analytics);

    HomeContainer.append(header, profileCard);

    app.append(HomeContainer);
}


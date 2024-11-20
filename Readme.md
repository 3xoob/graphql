# GraphQL

## Overview

This project is designed to explore the **GraphQL query language** by building a user profile page that displays dynamic data fetched from a GraphQL API. The application implements authentication, data visualization, and hosting, offering users insights into their personal journey and achievements through a user-friendly interface.

## Features

1. **Login and Authentication:**
   - Users can log in using their username or email along with their password.
   - A JWT token is generated upon successful login, enabling secure API access.
   - Invalid credentials display appropriate error messages.
   - Logout functionality to ensure session management.

2. **Dynamic Profile Page:**
   - Displays key user information like identification, achievements, and progression data.
   - Data is fetched from a GraphQL endpoint using various query techniques, including normal, nested, and parameterized queries.

3. **Statistical Graphs:**
   - Generates interactive and animated SVG-based graphs.
   - At least two different graphs are created, visualizing data such as XP progress, pass/fail ratios, and project performance.

4. **Hosting:**
   - The application is hosted on [Vercel](https://graphql-delta-lac.vercel.app/), ensuring easy accessibility.

## Technologies Used

- **GraphQL:** For querying and retrieving data from the API.
- **JWT Authentication:** To secure API access.
- **SVG:** For creating interactive and visually appealing statistical graphs.
- **JavaScript:** For frontend interactivity and data handling.
- **Vercel:** For hosting the application.

## GraphQL Queries

The project employs a variety of queries to interact with the API:

- **Basic Queries:** To retrieve straightforward data like user ID or login details.
- **Nested Queries:** To fetch related data, such as user details linked to a result.
- **Parameterized Queries:** To filter and retrieve specific information, such as details for a particular project or exercise.

## Key Graphical Visualizations

1. **XP Progression Graph:**
   - Visualizes the user's XP growth over time, showcasing trends and milestones.

2. **Project Pass/Fail Ratio:**
   - Displays performance across completed projects, helping users identify strengths and areas for improvement.

3. **Custom Visualizations:**
   - Additional graphs, such as audit success rates or Piscine project stats, can be explored for deeper insights.

## Hosting Details

The application is hosted on **Vercel**, offering seamless deployment and access. Visit the live application here: [GraphQL Profile](https://graphql-delta-lac.vercel.app/).

Here’s the updated section for running the project locally:

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://learn.reboot01.com/git/aabdulhu/graphql
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:3000`.


## Learning Objectives

This project emphasizes the following key concepts:

- Mastery of **GraphQL** and its query capabilities.
- Understanding **JWT authentication** and session management.
- Enhancing UI/UX skills with data-driven, interactive visualizations.
- Deploying web applications using modern hosting platforms like **Vercel**.

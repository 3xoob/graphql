import { GET_USER_INFO, GET_TOP_TRANSACTION, GET_AUDIT_STATUS, GET_TOTAL_XP, GET_USER_Technologies, GET_USER_Technical_Skills, GET_AUDIT_RATIO } from './queries';
// Class to call it in fetching data from the api with the selected queries
export class GraphQLService {
    apiUrl = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";
    #jwt() {
        return localStorage.getItem("jwt");
    }
    async #fetchData(query) {
        const jwt = this.#jwt();
        if (!jwt || jwt.split(".").length !== 3) {
            return [null, new Error('Invalid Token')];
        }
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            const result = await response.json();
            if (result.errors) {
                throw new Error("GraphQL Errors: " + result.errors.map((error) => error.message).join(", "));
            }
            return [result.data, null];
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching data:", error.message);
                return [null, error];
            }
            else {
                console.error("An unknown error occurred:", error);
                return [null, new Error(`An unknown error occurred: ${error}`)];
            }
        }
    }
    async getUserInfo() {
        const [data, error] = await this.#fetchData(GET_USER_INFO);
        if (error !== null) {
            return [null, error];
        }
        if ('user' in data && Array.isArray(data.user)) {
            return [data.user[0], null];
        }
        return [null, new Error("'user' key not in response")];
    }
    async getTopTransaction() {
        const [data, error] = await this.#fetchData(GET_TOP_TRANSACTION);
        if (error !== null) {
            return [null, error];
        }
        if ('transaction' in data && Array.isArray(data.transaction)) {
            return [data.transaction[0], null];
        }
        return [null, new Error("'transaction' key not in response")];
    }
    async getAuditStatus() {
        const [data, error] = await this.#fetchData(GET_AUDIT_STATUS);
        if (error !== null) {
            return [null, error];
        }
        if ('user' in data && Array.isArray(data.user)) {
            return [data.user[0], null];
        }
        return [null, new Error("'user_audit' key not in response")];
    }
    async getTotalXP() {
        const [data, error] = await this.#fetchData(GET_TOTAL_XP);
        if (error !== null) {
            return [null, error];
        }
        if ('transaction_aggregate' in data) {
            return [data.transaction_aggregate, null];
        }
        return [null, new Error("'transaction_aggregate' key not in response")];
    }
    async getUserTechnologies() {
        const [data, error] = await this.#fetchData(GET_USER_Technologies);
        if (error !== null) {
            return [null, error];
        }
        if ('transaction' in data) {
            return [data.transaction, null];
        }
        return [null, new Error("'transaction_skills' key not in response")];
    }
    async getUserTechnicalSkills() {
        const [data, error] = await this.#fetchData(GET_USER_Technical_Skills);
        if (error !== null) {
            return [null, error];
        }
        if ('transaction' in data) {
            return [data.transaction, null];
        }
        return [null, new Error("'transaction_skills' key not in response")];
    }
    async getAuditRatio() {
        const [data, error] = await this.#fetchData(GET_AUDIT_RATIO);
        if (error !== null) {
            return [null, error];
        }
        if ('user' in data && Array.isArray(data.user)) {
            return [data.user[0], null];
        }
        return [null, new Error("'user_audit_ratio' key not in response")];
    }
}

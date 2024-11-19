"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_AUDIT_RATIO = exports.GET_USER_Technical_Skills = exports.GET_USER_Technologies = exports.GET_TOTAL_XP = exports.GET_AUDIT_STATUS = exports.GET_TOP_TRANSACTION = exports.GET_USER_INFO = void 0;
// Define query strings
exports.GET_USER_INFO = `
    {
        user {
            id
            attrs
            login
            campus
        }
    }
`;
exports.GET_TOP_TRANSACTION = `
    {
        transaction(
            order_by: {amount: desc}
            limit: 1
            where: {
                type: {_eq: "level"},
                path: {_like: "/bahrain/bh-module%"}
            }
        ) {
            amount
        }
    }
`;
exports.GET_AUDIT_STATUS = `
    {
        user {
            validAudits: audits_aggregate(where: {grade: {_gte: 1}}) {
                nodes {
                    group {
                        captainLogin
                        path
                    }
                }
            }
            failedAudits: audits_aggregate(where: {grade: {_lt: 1}}) {
                nodes {
                    group {
                        captainLogin
                        path
                    }
                }
            }
        }
    }
`;
exports.GET_TOTAL_XP = `
    query {
        transaction_aggregate(
            where: {
                event: { path: { _eq: "/bahrain/bh-module" } }
                type: { _eq: "xp" }
            }
        ) {
            aggregate {
                sum {
                    amount
                }
            }
        }
    }
`;
exports.GET_USER_Technologies = `
    query {
        transaction(
            where: {
                _and: [
                    {type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" }},
                    {type: {_like: "%skill%"}},
                    {object: {type: {_eq: "project"}}},
                    {type: {_in: [
                         "skill_git", "skill_go", "skill_js", 
                        "skill_html", "skill_css", "skill_unix", "skill_docker", 
                        "skill_sql"
                    ]}}
                ]
            }
            order_by: [{type: asc}, {createdAt: desc}]
            distinct_on: type
        ) {
            amount
            type
        }
    }
`;
exports.GET_USER_Technical_Skills = `
    query {
        transaction(
            where: {
                _and: [
                    {type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" }},
                    {type: {_like: "%skill%"}},
                    {object: {type: {_eq: "project"}}},
                    {type: {_in: [
                        "skill_prog", "skill_algo", "skill_sys-admin", "skill_front-end", 
                        "skill_back-end", "skill_stats", "skill_ai", "skill_game", 
                        "skill_tcp"
                    ]}}
                ]
            }
            order_by: [{type: asc}, {createdAt: desc}]
            distinct_on: type
        ) {
            amount
            type
        }
    }
`;
exports.GET_AUDIT_RATIO = `
    {
        user {
            auditRatio
            totalUp
            totalDown
        }
    }
`;

export type Result<T> = readonly [T, null] | readonly [null, Error];

export type UserAttributes = {
    firstName?: string;
    lastName?: string;
    email?: string;
    addressCountry?: string;
    genders?: string;
    CPRnumber?: string;
    PhoneNumber?: string;
    dateOfBirth?: string;
    qualification?: string;
    Degree?: string;
    username?: string;
    campus?: string;
};

export interface IUser {
    firstName: string
    lastName: string
    id: number
    login: string
    email: string
    campus: string
}

export interface ITopTransaction {
    amount: number;
}

export interface IAuditStatus {
    validAudits: {
        nodes: {
            group: {
                captainLogin: string;
                path: string;
            };
        }[];
    };
    failedAudits: {
        nodes: {
            group: {
                captainLogin: string;
                path: string;
            };
        }[];
    };
}

export interface ITotalXp {
    aggregate: {
        sum: {
            amount: number;
        };
    };
}

export interface IUserSkill {
    amount: number;
    type: string;

}

export interface IAuditRatio {
    auditRatio: number;
    totalUp: number;
    totalDown: number;
}

export interface AuditData {
    ratio: number;
    done: number;
    received: number;
}

export interface Rank {
    minLevel: number;
    maxLevel: number;
    title: string;
}

export interface IRankInfo {
    currentRank: Rank,
    nextRank: Rank | null,
}

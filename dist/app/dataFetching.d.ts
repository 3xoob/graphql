import { IUser, Result, ITopTransaction, IAuditStatus, ITotalXp, IUserSkill, IAuditRatio } from '../types';
export declare class GraphQLService {
    #private;
    private apiUrl;
    getUserInfo(): Promise<Result<IUser>>;
    getTopTransaction(): Promise<Result<ITopTransaction>>;
    getAuditStatus(): Promise<Result<IAuditStatus>>;
    getTotalXP(): Promise<Result<ITotalXp>>;
    getUserTechnologies(): Promise<Result<IUserSkill>>;
    getUserTechnicalSkills(): Promise<Result<IUserSkill>>;
    getAuditRatio(): Promise<Result<IAuditRatio>>;
}
//# sourceMappingURL=dataFetching.d.ts.map
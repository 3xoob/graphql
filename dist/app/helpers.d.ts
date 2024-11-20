import { IUserSkill, IAuditStatus } from "../types";
export declare function formatSize(sizeInBytes: number): string;
export declare function createDataElement(label: string, value: string): HTMLElement;
export declare function createMediaLink(href: string, iconClass: string, backgroundColor: string): HTMLAnchorElement;
export declare function createDataElementHead(label: string, value: string): HTMLElement;
export declare function formatDate(dateString: any): string | undefined;
export declare function processUserSkillsData(userSkill: IUserSkill): [number[], string[]];
export declare function getAuditNameFromPath(path: string): string;
export declare function reverseAudits(auditStatus: IAuditStatus): IAuditStatus;
//# sourceMappingURL=helpers.d.ts.map
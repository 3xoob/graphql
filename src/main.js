"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./app/router"));
window.addEventListener("popstate", () => {
    (0, router_1.default)();
});
(0, router_1.default)();

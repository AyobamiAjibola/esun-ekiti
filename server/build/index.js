"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const logger_1 = __importDefault(require("./utils/logger"));
const server_1 = __importDefault(require("./utils/server"));
const connect_1 = __importDefault(require("./utils/connect"));
dotenv_1.default.config({ path: (0, path_1.resolve)(__dirname, "../.env") });
const PORT = process.env.PORT || 5000;
const app = (0, server_1.default)();
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Server running on port: ${PORT} ⚡`);
    yield (0, connect_1.default)();
}));
//# sourceMappingURL=index.js.map
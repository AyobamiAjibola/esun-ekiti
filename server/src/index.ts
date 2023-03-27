import dotenv from 'dotenv';
import { resolve } from "path";
import log from "./utils/logger";
import createServer from "./utils/server";
import connect from "./utils/connect";

// dotenv.config({ path: resolve(__dirname, "../.env") });
import 'dotenv/config';

const PORT = process.env.PORT || 5000;

// app.use(globalErrorHandler);
const app = createServer();

app.listen(PORT, async () => {
    log.info(`Server running on port: ${PORT} ⚡`);
    await connect()
});
import db from "../sequelize/models/index";
import log from "./logger";

const connect = async () => {
  try {
    await db.sequelize.authenticate();
    log.info("Connected to database successfully");
  } catch (error) {
    log.error("Could not connect to DB");
  }
};

export default connect;

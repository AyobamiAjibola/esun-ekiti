import database from '../config/database';
import log from "./logger";

const connect = async () => {
  try {
    await database.init();
    // await database.sequelize.sync({alter: true});
    log.info("Connected to database successfully");
  } catch (error) {
    log.error("Could not connect to DB");
  }
};

export default connect;

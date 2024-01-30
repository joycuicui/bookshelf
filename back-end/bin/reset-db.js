// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const chalk = require("chalk");
const db = require("../database/connection");

const runSQLFilesByDirectory = async (directory) => {
  console.log(chalk.cyan(`-> Loading ${directory} Files ...`));
  const filenames = fs.readdirSync(`./database/${directory}`);

  for (const filename of filenames) {
    const sql = fs.readFileSync(`./database/${directory}/${filename}`, "utf8");
    console.log(`\t-> Running ${chalk.green(filename)}`);
    await db.query(sql);
  }
};

(async () => {
  try {
    const { DB_NAME, DB_HOST, DB_USER } = process.env;

    const connectionMessage = chalk.bgMagenta(
      `-> Connecting to database ${DB_NAME} on ${DB_HOST} as ${DB_USER}...\n`
    );
    console.log(connectionMessage);

    await runSQLFilesByDirectory("schema");
    await runSQLFilesByDirectory("seeds");

    console.log();
    process.exit();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit();
  }
})();

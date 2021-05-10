import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = async () => await db.any("SELECT * FROM park");

export const addTask = async (name) =>
  (
    await db.any("INSERT INTO tasks(name) VALUES($1) RETURNING id, name", [
      name,
    ])
  )[0];
//search usersave parks
export const getUserFavorites = async (id) =>
  await db.any(`SELECT * FROM park WHERE USER_ID=${id}`);
//insert usersave park
export const insertUserFavorites = async (params) =>
  await db.any(
    `INSERT INTO PARK (PARK_ID,PARK_NAME,PARK_COVER,USER_ID) VALUES ('${params.parkId}','${params.parkName}','${params.parkCover}','${params.userId}')`,
  );
function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }
  console.log(connection);
  return pgp()(connection);
}

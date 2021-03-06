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
export const testSearch = async () => {
  let data = await db.any("SELECT * FROM PARK WHERE PARK_ID IN ('1','2')");
  console.log(data, "testSearch");
};
// testSearch();
//search usersave parks
export const getUserFavorites = async (userId) => {
  console.log(userId);
  const user = await db.any(`SELECT * FROM USERS WHERE USER_ID = '${userId}'`);
  console.log(user, "user");
  if (user.length == 0) {
    return [];
  }
  if (user) {
    const ids = user[0]["park_ids"].split(",");
    let strId = "";
    // [1,2,3,4] => '1','2','3','4'
    if (ids.length > 0) {
      for (let i = 0; i < ids.length; i++) {
        strId += i == ids.length - 1 ? `'${ids[i]}'` : `'${ids[i]}',`;
      }
    }
    return await db.any(`SELECT * FROM PARK WHERE PARK_ID IN (${strId})`);
  }
};
// console.log(getUserFavorites(1234), "user");
export const delUserFavorite = async (userId, parkId) => {
  const user = await db.any(`SELECT * FROM USERS WHERE USER_ID = '${userId}'`); //db.any returns a promise, await is for resolve in the promise
  if (user.length > 0) {
    let _ids = user[0]["park_ids"].split(","); //turn parkID string into a parkID array
    _ids.splice(_ids.indexOf(parkId), 1);
    await db.any(
      `UPDATE USERS  SET PARK_IDS = '${_ids.join(
        ",", //update the specific user's saved parkIDs, turn array into string
      )}' WHERE USER_ID = '${userId}'`,
    );
  }
};
//insert usersave park
export const insertPark = async (params) => {
  const hasPark = await db.any(
    //take out "resolve" in promise; in array format
    `SELECT * FROM PARK WHERE PARK_ID = '${params.parkId}'`,
  );
  if (hasPark.length === 0) {
    await db.any(
      `INSERT INTO PARK (PARK_ID,PARK_NAME,PARK_COVER) VALUES ('${params.parkId}','${params.parkName}','${params.parkCover}')`,
    );
  }
};
export const insertUser = async (params) => {
  //
  const hasUser = await db.any(
    `SELECT * FROM USERS WHERE USER_ID = '${params.userId}'`,
  );

  if (hasUser.length === 0) {
    await db.any(
      `INSERT INTO USERS (USER_ID,PARK_IDS) VALUES ('${params.userId}','${params.parkId}')`,
    );
  } else {
    let _ids = hasUser[0].park_ids.split(",");
    if (!_ids.includes(params.parkId)) {
      _ids.push(params.parkId);
    }
    await db.any(
      `UPDATE USERS  SET PARK_IDS = '${_ids.join(",")}' WHERE USER_ID = '${
        params.userId
      }'`,
    );
  }
};
// insertPark({
//   parkId: "5",
//   parkName: "testParkname",
//   parkCover: "123",
//   userId: "123",
//   parkIds: "1,2,3,4,5,6,7asd,aaa",
// });
// insertUser({
//   userId: "123",
//   parkId: "99",
// });
function initDb() {
  let connection;
  dotenv.config({ path: "../.env" });
  console.log(process.env.DATABASE_URL, "url");
  if (process.env.DATABASE_URL === undefined) {
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

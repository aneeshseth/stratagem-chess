const jwt = require("jsonwebtoken");
require("dotenv").config();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});
const bcrypt = require("bcryptjs");

const signUp = (request, response) => {
  const { username, email, password, profilepic } = request.body;
  console.log(username);
  pool.query(
    "SELECT * FROM USERS WHERE USERNAME = $1 OR EMAIL = $2",
    [username, email],
    (err, res) => {
      if (res.rows.length < 1) {
        pool.query(
          "INSERT INTO USERS (USERNAME, EMAIL, PASSWORD, RATING, PROFILEPIC) VALUES ($1,$2,$3,$4,$5)",
          [username, email, bcrypt.hashSync(password), 0, profilepic],
          (err, res) => {
            if (err) {
              throw err;
            }
            const token = jwt.sign({ id: username }, "ANEESH", {
              expiresIn: "5d",
            });
            console.log(token);
            return response
              .cookie("token", token, {
                httpOnly: true,
                expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 100),
              })
              .send("User Created");
          }
        );
      } else {
        return response.status(400).send("User Exists!");
      }
    }
  );
};

const login = (request, response) => {
  const { username, email, password } = request.body;
  pool.query(
    "SELECT * FROM USERS WHERE EMAIL = $1 OR USERNAME = $2",
    [email, username],
    (err, res) => {
      if (res.rows.length < 1) {
        return response.status(400).send("User DNE, please Sign Up");
      } else {
        const comparePassword = bcrypt.compare(password, res.rows[0].password);
        if (comparePassword) {
          const token = jwt.sign({ id: res.rows[0].id }, process.env.JWT_KEY, {
            expiresIn: "3hr",
          });
          return response
            .cookie("token", token, {
              httpOnly: true,
              expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 100),
            })
            .send("User Logged In");
        } else {
          return response.status(400).send("Invalid Credentials!");
        }
      }
    }
  );
};

const checkLogin = async (request, response) => {
  return response.status(200).send("User Verified");
};

module.exports = { signUp, login, checkLogin };

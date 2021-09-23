require("dotenv").config();
const pool = require("../helpers/connection");

module.exports = {
  addShow: (req, res, next) => {
    const password = req.body.password;
    const name = req.body.name;
    const description = req.body.description;

    if (password == process.env.SECURE_PASSWORD) {
      queryString =
        "INSERT INTO rugradioshow (name, description) VALUES (?, ?);";
      pool.query(queryString, [name, description], (err, rows, fields) => {
        if (err) {
          return next(err);
        } else {
          return res.json(rows);
        }
      });
    } else {
      next();
    }
  },

  removeShow: (req, res, next) => {
    const password = req.body.password;
    const idshow = req.body.idshow;

    if (password == process.env.SECURE_PASSWORD) {
      queryString = "DELETE FROM rugradioshow WHERE idrugradioshow = ?;";
      pool.query(queryString, [idshow], (err, rows, fields) => {
        if (err) {
          return next(err);
        } else {
          return res.json(rows);
        }
      });
    } else {
      next();
    }
  },

  updateShow: (req, res, next) => {
    const password = req.body.password;
    const idshow = req.body.idshow;
    const name = req.body.name;
    const description = req.body.description;

    if (password == process.env.SECURE_PASSWORD) {
      queryString =
        "UPDATE rugradioshow SET name = ?, description = ?  WHERE idrugradioshow = ?;";
      pool.query(
        queryString,
        [name, description, idshow],
        (err, rows, fields) => {
          if (err) {
            return next(err);
          } else {
            return res.json(rows);
          }
        }
      );
    } else {
      next();
    }
  },

  getShows: (req, res, next) => {
    let queryString = "SELECT * FROM rugradioshow";
    pool.query(queryString, [], (err, rows, fields) => {
      if (err) {
        return next(err);
      } else {
        return res.json(rows);
      }
    });
  },
};

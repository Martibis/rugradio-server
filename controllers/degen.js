require("dotenv").config();
const pool = require("../helpers/connection");

module.exports = {
  addDegen: (req, res, next) => {
    const password = req.body.password;
    const handle = req.body.handle;
    const image = req.body.image;

    if (password == process.env.SECURE_PASSWORD) {
      queryString = "INSERT INTO degen (handle, image) VALUES (?, ?);";
      pool.query(queryString, [handle, image], (err, rows, fields) => {
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

  updateDegen: (req, res, next) => {
    const password = req.body.password;
    const iddegen = req.body.iddegen;
    let handle = req.body.handle;
    let image = req.body.image;

    if (handle == "") {
      handle = null;
    }
    if (image == "") {
      image = null;
    }

    if (password == process.env.SECURE_PASSWORD) {
      queryString =
        "UPDATE degen SET handle = COALESCE(?, handle), image = COALESCE(?, image)  WHERE iddegen = ?;";
      pool.query(queryString, [handle, image, iddegen], (err, rows, fields) => {
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

  removeDegen: (req, res, next) => {
    const password = req.body.password;
    const iddegen = req.body.iddegen;

    if (password == process.env.SECURE_PASSWORD) {
      queryString = "DELETE FROM degen WHERE iddegen = ?;";
      pool.query(queryString, [iddegen], (err, rows, fields) => {
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

  getDegens: (req, res, next) => {
    let queryString = "SELECT * FROM degen";
    pool.query(queryString, [], (err, rows, fields) => {
      if (err) {
        return next(err);
      } else {
        return res.json(rows);
      }
    });
  },
};

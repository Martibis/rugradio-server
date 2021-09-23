require("dotenv").config();
const pool = require("../helpers/connection");

module.exports = {
  addHost: (req, res, next) => {
    const password = req.body.password;
    const handle = req.body.handle;
    const image = req.body.image;

    if (password == process.env.SECURE_PASSWORD) {
      queryString = "INSERT INTO rugradiohost (handle, image) VALUES (?, ?);";
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

  removeHost: (req, res, next) => {
    const password = req.body.password;
    const idhost = req.body.idhost;

    if (password == process.env.SECURE_PASSWORD) {
      queryString = "DELETE FROM rugradiohost WHERE idrugradiohost = ?;";
      pool.query(queryString, [idhost], (err, rows, fields) => {
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

  updateHost: (req, res, next) => {
    const password = req.body.password;
    const idhost = req.body.idhost;
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
        "UPDATE rugradiohost SET handle = COALESCE(?, handle), image = COALESCE(?, image)  WHERE idrugradiohost = ?;";
      pool.query(queryString, [handle, image, idhost], (err, rows, fields) => {
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

  getHosts: (req, res, next) => {
    let queryString = "SELECT * FROM rugradiohost";
    pool.query(queryString, [], (err, rows, fields) => {
      if (err) {
        return next(err);
      } else {
        return res.json(rows);
      }
    });
  },
};

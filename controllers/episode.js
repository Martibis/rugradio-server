require("dotenv").config();
const pool = require("../helpers/connection");

module.exports = {
  addEpisode: (req, res, next) => {
    const password = req.body.password;
    const idhost = req.body.idhost;
    const idshow = req.body.idshow;
    const description = req.body.description;
    const name = req.body.name;
    const start = req.body.start;
    const end = req.body.end;

    if (password == process.env.SECURE_PASSWORD) {
      queryString =
        "INSERT INTO rugradioepisode (idhost, idshow, description, name, start, end) VALUES (?, ?, ?, ?, ?, ?);";
      pool.query(
        queryString,
        [idhost, idshow, description, name, start, end],
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

  removeEpisode: (req, res, next) => {
    const password = req.body.password;
    const idepisode = req.body.idepisode;

    if (password == process.env.SECURE_PASSWORD) {
      queryString = "DELETE FROM rugradioepisode WHERE idrugradioepisode = ?;";
      pool.query(queryString, [idepisode], (err, rows, fields) => {
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

  updateEpisode: (req, res, next) => {
    const password = req.body.password;
    const idepisode = req.body.idepisode;
    let idhost = req.body.idhost;
    let idshow = req.body.idshow;
    let description = req.body.description;
    let name = req.body.name;
    let start = req.body.start;
    let end = req.body.end;

    if (idhost == "") {
      idhost = null;
    }
    if (idshow == "") {
      idshow = null;
    }
    if (description == "") {
      description = null;
    }
    if (name == "") {
      name = null;
    }
    if (start == "") {
      start = null;
    }
    if (end == "") {
      end = null;
    }

    if (password == process.env.SECURE_PASSWORD) {
      queryString =
        "UPDATE rugradioepisode SET idhost = COALESCE(?, idhost), idshow = COALESCE(?, idshow), name = COALESCE(?, name), description = COALESCE(?, description), start = COALESCE(?, start), end = COALESCE(?, end)  WHERE idrugradioepisode = ?;";
      pool.query(
        queryString,
        [idhost, idshow, name, description, start, end, idepisode],
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

  getEpisodes: (req, res, next) => {
    const date = req.body.date;

    let startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    let startDateIso = startDate.toISOString();

    let endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    let endDateIso = endDate.toISOString();

    let queryString =
      "SELECT idrugradioepisode, idhost, idshow, rugradioepisode.description, rugradioepisode.name, start, end, rugradiohost.idrugradiohost, rugradiohost.handle, rugradiohost.image, rugradioshow.idrugradioshow, rugradioshow.name as showname, rugradioshow.description as showdescription  FROM rugradioepisode LEFT join rugradiohost ON idhost = idrugradiohost LEFT join rugradioshow ON idshow = idrugradioshow WHERE start >= ? AND start < ?";

    pool.query(queryString, [startDateIso, endDateIso], (err, rows, fields) => {
      if (err) {
        return next(err);
      } else {
        return res.json(rows);
      }
    });
  },
};

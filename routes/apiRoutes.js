// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var fs = require("fs");
var path = require("path");
var notes = [];

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
      if (err) throw err;
      notes = JSON.parse(data);
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = notes.length;
    notes.push(newNote);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) throw err;
        res.json(notes);
      }
    );
  });

  app.delete("/api/notes/:id", function (req, res) {
    notes = notes.filter((note) => {
      return note.id != req.params.id;
    });

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) throw err;
        res.json(notes);
      }
    );
  });
};

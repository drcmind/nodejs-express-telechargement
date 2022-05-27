const express = require("express");
const path = require("path");
const app = express();

const DOSSIER_FICHIERS = path.join(__dirname, "fichiers");

app.get("/", (req, res) => {
  res.send(
    "<h1>Bienvenu dans notr site</h1>" +
      '<ul><li>Télécharger : <a href="/fichier1.txt">le premier fichier</a></li>' +
      '<li>Télécharger : <a href="/fichier2.txt">le deuxième fichier</a></li></ul>'
  );
});

app.get("/:fichier(*)", (req, res) => {
  res.download(req.params.fichier, { root: DOSSIER_FICHIERS }, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("<p>Une erreur es survenu</p>");
    }
  });
});

app.use((req, res) => {
  res.send("<h3>Ressource inrouvable</h3>");
});

app.listen(3000);
console.log("L'application tourne au pot 3000");

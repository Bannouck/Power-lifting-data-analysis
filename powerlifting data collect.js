function fusionnerTableaux() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // On prend toutes les feuilles sauf "DONNEES" et "frame de base"
  const feuilles = ss.getSheets()
    .map(s => s.getName())
    .filter(nom => nom !== "DONNEES")
    .filter(nom => nom !== "Feuille 1")
    .filter(nom => nom !== "STATS")
    .filter(nom => nom !== "RPE CHART");

  let resultat = [];

  // Récupérer l'entête
  const entete = ss.getSheetByName(feuilles[0])
    .getRange(3, 2, 1, 8)
    .getValues()[0];
  resultat.push(entete);

  // Parcours de chaque feuille
  feuilles.forEach(nomFeuille => {
    const feuille = ss.getSheetByName(nomFeuille);

    // Bloc de données
    let bloc1 = feuille.getRange(5, 2, feuille.getLastRow() - 4, 8).getValues();
    //garder uniquement lignes valides
    bloc1 = bloc1.filter(r => r[0] && JSON.stringify(r) !== JSON.stringify(entete));
    // Ajouter les données au tableau résultat
    resultat = resultat.concat(bloc1);

    let bloc2 = feuille.getRange(5,11,feuille.getLastRow()-4, 8).getValues();
    bloc2 = bloc2.filter(r => r[0] && JSON.stringify(r) !== JSON.stringify(entete))
    resultat = resultat.concat(bloc2);

    let bloc3 = feuille.getRange(5,20,feuille.getLastRow()-4, 8).getValues();
    bloc3 = bloc3.filter(r => r[0] && JSON.stringify(r) !== JSON.stringify(entete))
    resultat = resultat.concat(bloc3);

    let bloc4 = feuille.getRange(5,29,feuille.getLastRow()-4, 8).getValues();
    bloc4 = bloc4.filter(r => r[0] && JSON.stringify(r) !== JSON.stringify(entete))
    resultat = resultat.concat(bloc4);
  });

  // Écrire dans la feuille DONNEES
  let feuilleFusion = ss.getSheetByName("DONNEES") || ss.insertSheet("DONNEES");
  feuilleFusion.clearContents();
  feuilleFusion
    .getRange(1, 1, resultat.length, resultat[0].length)
    .setValues(resultat);
}

function ajouterCotes() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("DONNEES");
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  // On suppose que la première ligne est l’entête
  var headers = data[0];
  var coteColIndex = headers.length; // nouvelle colonne à la fin
  headers.push("COTE");
  data[0] = headers;

  // Boucle sur les données à partir de la 2e ligne
  for (var i = 1; i < data.length; i++) {
    var feuille = data[i][0]; // première colonne = nom_de_la_feuille (adapter si besoin)
    var colIndex = data[i][1]; // colonne source dans la feuille originale (adapter si tu stockes ça)
    var rowIndex = data[i][2]; // ligne source dans la feuille originale (adapter si tu stockes ça)

    // Calcul du chapitre et paragraphe
    var chapitre = Math.floor((colIndex - 1) / 8) + 1;
    var paragraphe = Math.floor((rowIndex - 1) / 10) + 1;

    var cote = feuille + "+" + chapitre + "+" + paragraphe;
    data[i][coteColIndex] = cote;
  }

  // Réécriture dans la feuille DONNEES
  sheet.clearContents();
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}

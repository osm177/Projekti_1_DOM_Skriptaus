// API-osoite, josta haetaan käynnissä olevat ottelut
const apiOsoite = "https://v3.football.api-sports.io/fixtures?live=all";

// Oma henkilökohtainen API-avain
const apiAvain = "LISÄÄ API AVAIN";
// Lähetetään pyyntö API-palvelimelle
fetch(apiOsoite, {
    method: "GET",
    headers: {
        "x-apisports-key": apiAvain
    }
})
// Muutetaan palvelimen vastaus JSON-muotoon
.then(vastaus => {
    if (!vastaus.ok) {
        throw new Error("API-pyyntö epäonnistui: " + vastaus.status);
    }
    return vastaus.json();
})
// Käsitellään ja näytetään API:n palauttamat tiedot
.then(data => {
    console.log("Yhteys API-palveluun onnistui!");
    console.log("Haetut ottelutiedot:", data);

    document.getElementById("tulos").textContent =
        "API-yhteys toimii! Otteluita löytyi: " + data.response.length;
})
// Käsitellään mahdolliset virheet
.catch(virhe => {
    console.error("Tapahtui virhe:", virhe);
});
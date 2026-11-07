// API-osoite, josta haetaan käynnissä olevat ottelut
const apiOsoite = "https://v3.football.api-sports.io/fixtures?live=all";

// Oma henkilökohtainen API-avain
const apiAvain = "639e23290b1749e1c71f785868145c55";
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
    
    // Tähän tallennan haetut ottelut muuttujaan
    const ottelut = data.response;
    console.log("API:n palauttamat ottelut:", ottelut);
    console.log("Otteluiden määrä:", ottelut.length);

    // Päivitetään sivun ilmoitus
    document.getElementById("tulos").textContent =
    "Otteluita löytyi: " + ottelut.length;

    // Haetaan HTML-sivulta otteluiden näyttöalue =
    const otteluAlue = document.getElementById("ottelut");

    // Käydään jokainen ottelu läpi, esim. nimet, maalit ja tilanne
    ottelut.forEach(ottelu => {
        const kotiJoukkue = ottelu.teams.home.name;
        const vierasJoukkue = ottelu.teams.away.name;

        const kotiMaalit = ottelu.goals.home;
        const vierasMaalit = ottelu.goals.away;

        const tilanne = ottelu.fixture.status.long;

        const otteluKortti = document.createElement("div");

        otteluKortti.innerHTML = `
            <h3>${kotiJoukkue} - ${vierasJoukkue}</h3>
            <p>Tulos: ${kotiMaalit} - ${vierasMaalit}</p>
            <P>Tilanne: ${tilanne}</p>
            <hr>
        `;

        // lisätään verkkosivulle
        otteluAlue.appendChild(otteluKortti);
    });
})

// Käsitellään mahdolliset virheet
.catch(virhe => {
console.error("Tapahtui virhe:", virhe);
document.getElementById("tulos").textContent =
"Otteluiden hakeminen epäonnistui.";

});
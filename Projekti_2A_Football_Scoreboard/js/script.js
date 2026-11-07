// API-osoite, josta haetaan käynnissä olevat ottelut
const apiOsoite = "https://v3.football.api-sports.io/fixtures?live=all";
    let kaikkiOttelut = [];
    let aktiivinenSuodatin = "kaikki";

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
    console.log("API:N koko vastaus:", data);
    console.log("API-ERRORS:", data.errors);
    console.log("API-RESULTS:", data.results);
    console.log("API-RESPONSE:", data.response);
    kaikkiOttelut = ottelut;
   

    // Päivitetään sivun ilmoitus
    document.getElementById("tulos").textContent =
    "Otteluita löytyi: " + ottelut.length;
    suodataOttelut();
   
})

    

// Käsitellään mahdolliset virheet
.catch(virhe => {
    console.error("Tapahtui virhe:", virhe);
    document.getElementById("tulos").textContent =
        "Otteluiden hakeminen epäonnistui. " + virhe.message;

});

function naytaOttelut(ottelut) {

    const otteluAlue = document.getElementById("ottelut");

    otteluAlue.innerHTML = " ";

    // Käydään jokainen ottelu läpi, esim. nimet, maalit ja tilanne
    ottelut.forEach(ottelu => {
        if (!ottelu.teams?.home || !ottelu.teams?.away){
            console.warn("Ottelun joukkueiden tiedot puuttuvat:", ottelu);
            return;
        }
        const kotiJoukkue = ottelu.teams.home.name;
        const vierasJoukkue = ottelu.teams.away.name;

        const kotiLogo = ottelu.teams.home.logo;
        const vierasLogo = ottelu.teams.away.logo;

        const kotiMaalit = ottelu.goals.home;
        const vierasMaalit = ottelu.goals.away;

        const tilanne = ottelu.fixture.status.long;

        const peliaika = ottelu.fixture.status.elapsed;
        const liiga = ottelu.league.name;

        const onKaynnissa = ottelu.fixture.status.short ==="1H" ||
            ottelu.fixture.status.short ==="2H" ||
            ottelu.fixture.status.short === "HT";


        const otteluKortti = document.createElement("div");

        otteluKortti.innerHTML = `
            <div class="ottelu-ylapalkki">
                <span>${liiga}</span>
                ${onKaynnissa ? '<span class="live-merkki">⏺ LIVE</span>' : " "}
            </div>

            <div class="joukkue">
                <img src="${kotiLogo}" alt="${kotiJoukkue}">
                <span>${kotiJoukkue}</span>
                <strong>${kotiMaalit ?? "-"}</strong>
            </div>

            <div class="joukkue">
                <img src="${vierasLogo}" alt="${vierasJoukkue}">
                <span>${vierasJoukkue}</span>
                <strong>${vierasMaalit ?? "-"}</strong>
            </div>

            <div class="ottelu-tilanne">
                ${peliaika !== null && peliaika !== undefined ? peliaika + " ' " : tilanne}
                </div>

        `;

        // lisätään verkkosivulle
        otteluAlue.appendChild(otteluKortti);
    });

}

function suodataOttelut() {
    let suodatetutOttelut = kaikkiOttelut;

    if (aktiivinenSuodatin === "kaynnissa"){
        suodatetutOttelut = kaikkiOttelut.filter(ottelu =>
            ["1H", "HT", "2H", "ET", "BT", "P"].includes(ottelu.fixture.status.short)
        );
    }

    if (aktiivinenSuodatin === "paattyneet") {
        suodatetutOttelut = kaikkiOttelut.filter(ottelu =>
            ["FT", "AET", "PEN"].includes(ottelu.fixture.status.short)
        );
    }

    const otteluAlue = document.getElementById("ottelut");

    otteluAlue.innerHTML = " ";

    document.getElementById("tulos").textContent =
        "Otteluita löytyi: " + suodatetutOttelut.length;

    console.log("Valitun suodattimen ottelut:",suodatetutOttelut);

    naytaOttelut(suodatetutOttelut);
}

// Haetaan kaikki painikkeet
const suodatinPainikkeet = document.querySelectorAll(".suodatin");

suodatinPainikkeet.forEach(painike => {
    painike.addEventListener("click", () => {

        aktiivinenSuodatin = painike.dataset.suodatin;

        suodatinPainikkeet.forEach(btn => {
            btn.classList.remove("aktiivinen");
        });

        painike.classList.add("aktiivinen");

        suodataOttelut();


    });
});
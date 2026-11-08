

    let kaikkiOttelut = [];
    let aktiivinenSuodatin = "kaikki";


function haeOttelut() {

    //haetaan ottelut Netlify funktion kautta
    fetch("/.netlify/functions/ottelut")


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

    console.log("API-ERRORS:", data.errors);
    console.log("API-RESULTS:", data.results);
    console.log("API-RESPONSE:", data.response);

    kaikkiOttelut = data.response;
    
    // Tallennetaan viimeisin päivitysaika
    document.getElementById("paivitysAika").textContent = 
        "Viimeksi päivitetty: " + new Date().toLocaleTimeString("fi-FI");

    suodataOttelut();

})
// käsitellään virheitä
.catch(virhe => {
    console.error("Tapahtui virhe:", virhe);

    document.getElementById("tulos").textContent =
        "Otteluiden hakeminen epäonnistui. " + virhe.message;
}); 

}

// hakee ottelut sivun avautuessa
haeOttelut();

// päivittää 15min välein ettei API:n raja vastaan.
setInterval(haeOttelut, 15 * 60 * 1000);
 
   
  

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

        const onKaynnissa = ["1H", "HT", "2H", "ET", "BT", "P"].includes(
            ottelu.fixture.status.short
        );
        


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

//const haePainike = document.getElementById("haeOttelut");

//haePainike.addEventListener("click", () => {
   // haeOttelut();
//});
const haePainike = document.getElementById("haeOttelut");

haePainike.addEventListener("click", () => {
    console.log("Hae uudet ottelut -painiketta painettiin!");

    document.getElementById("tulos").textContent = "Haetaan uusia otteluita...";

    haeOttelut();
});
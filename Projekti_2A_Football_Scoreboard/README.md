Jalkapallon tulokset

1. Projektin kuvaus

Tässä projektissa tehdään sovellus, joka hakee tuloksia ja ottelutietoja ulkoisesta API-palvelusta. Valitsen tämän, koska käytän vastaavia sovelluksia urheilun seuraamiseen.

Sovellus käyttää API-Football-palvelua, josta haetaan jalkapallo-otteluiden tietoja. Tiedot haetaan JavaScriptin Fetch-toiminolla ja se näytetään verkkosivulla.

Projektin tavoitteena oli harjoitella AJAX-pyyntojen tekemistä, REST API-rajapinnan käyttöä sekä javascriptin avulla haetun tiedon käsittelyy ja näyttämistä.

2. Sovelluksen ominaisuudet

Sovelluksen suunniteltuja ja toteutettuja ominaisuuksia ovat:

- Jalkapallo-otteluiden tietojen hakeminen API-palvelusta.
- Joukkueiden nimien ja logojen näyttäminen.
- Otteluiden tulosten näyttäminen.
- Ottelun peliajan ja tilanteen näyttäminen.
- LIVE-merkintä käynnissä peleissä.
- Otteluiden suodattaminen painikkeiden avulla.
- Ottelutietojen auttomaattinen päivittäminen 15 min välein.

3. Käytetyt teknologiat

- HTML
- CSS
- JavaScript - API-pyyntöjen tekemiseen ja tietojen käsittelyyn.
- Fetch API - tietojen hakemiseen ulkoisesta palvelusta.
- API-Football -jalkapallo ottelutietojen lähteenä.

4. Käytetty API

API-palvelu:
https://www.api-football.com/

API-avainta käsitellään Netlify function -toiminnon kautta, eikä avainta säilytetä julkisessa JavaScript tiedostossa.

5. Sovelluksen käyttö

Sovellus näyttää päivän jalkapallo-otteluita. Jokaisessa ottelukortissa näytetään tiimien nimet ja logot, ottelun tulos sekä ottelun pelitilanne. 
Otteluita voi suodataa kolmella painikkeella:
- Kaikki ottelut
- Käynnissä
- Päättyneet

Lisäski käyttäjä voi hakea uusimmat ottelut painamalla "Hae uudet ottelut" painiketta.

6. Sovelluksen julkaisu

Sovellus on julkaistu Netlify-palvelussa.

Julkaistun sovelluksen linkki:

https://fancy-medovik-08392a.netlify.app

7. Github

Projektin lähdekoodi löytyy Githubista:

https://github.com/osm177/Projekti_1_DOM_Skriptaus/blob/main/Projekti_2A_Football_Scoreboard/README.md?

8. Itsearviointi

Projektin avulla opin tekemään AJAX-pyyntöjä Fetch API:n avulla ja hakemaan tietoja ulkoisesta REST API-rajapinnasta. Harjoittelin myös Javascriptillä haetun tiedon käsittelyä ja näyttämistä verkkosivulla.

Opin käyttämään Netlify functions -toimintoja API-avaimen suojaamiseen sekä julkaisemaan verkkosovelluksen Netlify:ssa.

9. Esittelyvideo

https://youtu.be/Wwsv4p7y02c

10. Lähteet

- API-Football: https://www.api-football.com/
- Netlify Documentation: https://docs.netlify.com
- MDN Web Docs: https://developer.mozilla.org/


Tekoälun käyttö

Projektin tekemisessä käytin apuna chatGPT:tä.
Hyödynsin sitä JavaScriptin ymmärtämisessä, ongelmien ratkaisemisessa ja virheiden korjaamisessa.

Käytin sitä tukena projektin eri vaiheissa, mutta testasin sovelluksen toimintaa itse ja tein lopulliset muutokset omaan projektiini.
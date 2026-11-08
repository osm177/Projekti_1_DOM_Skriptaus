// tämä netlify funktio hakee ottelut API-football palvelusta
export default async (request) => {

    try {
        const apiAvain = Netlify.env.get("API_FOOTBALL_KEY");

        if (!apiAvain) {
            throw new Error("API-avain puuttuu");
        }

        const tanaan = new Date();
        const paivamaara = tanaan.toISOString().split("T")[0];

        const vastaus = await fetch(
            `https://v3.football.api-sports.io/fixtures?date=${paivamaara}`,
            {
                headers: {
                    "x-apisports-key": apiAvain
                }
            }
        );

        const data = await vastaus.json();
        return new Response(JSON.stringify(data), {
            status: vastaus.status,
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (virhe) {
        return new Response(
            JSON.stringify({error: virhe.message}),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}
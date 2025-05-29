const url = 'https://blockchain.info/ticker';

const currencyToCountry = {
    USD: "United States",
    EUR: "Eurozone",
    GBP: "United Kingdom",
    JPY: "Japan",
    CAD: "Canada",
    AUD: "Australia",
    CNY: "China",
    INR: "India",
    BRL: "Brazil",
    RUB: "Russia",
    ARS: "Argentina",
    CHF: "Switzerland",
    CLP: "Chile",
    DKK: "Denmark",
    CZK: "Czech Republic",
    HKD: "Hong Kong",
    HRK: "Croatia",
    HUF: "Hungary",
    ISK: "Iceland",
    KRW: "South Korea",
    NGN: "Nigeria",
    NZD: "New Zealand",
    PLN: "Poland",
    RON: "Romania",
    SEK: "Sweden",
    SGD: "Singapore",
    THB: "Thailand",
    TRY: "Turkey",
    TWD: "Taiwan",
};


function recupererPrix() {
    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;
                let pricesContainer = document.querySelector('#prices');
                pricesContainer.innerHTML = '';

                for (let currency in reponse) {
                    let price = reponse[currency].last;
                    let country = currencyToCountry[currency] || "Unknown Country";

                    let card = document.createElement('div');
                    card.className = 'col-md-3';

                    card.innerHTML = `
                        <div class="card shadow-sm border-0 h-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">${currency}</h5>
                            <p class="mb-1">${country}</p>
                            <p class="card-text fs-4 text-success">${price}</p>
                        </div>
                        </div>
                    `;
                    pricesContainer.appendChild(card);
                }
            } else {
                alert('A problem occurred. Please try again later.');
            }
        }
    };

    console.log('Prices updated');
}

setInterval(recupererPrix, 1000);

const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    toggleBtn.textContent = document.body.classList.contains("dark-theme")
        ? "☀️ Switch Theme"
        : "🌙 Switch Theme";
});

const tickers = document.querySelectorAll('.ticker');
const prices = document.querySelectorAll('.price');
const changes = document.querySelectorAll('.change')

// const getData = async function (){
//     for(let ticker of tickers){
//         const r = await fetch(`https://api.cryptonator.com/api/ticker/${ticker.textContent}-usd`);
//         const priceData = await r.json();
//         const num = parseFloat(priceData.ticker.price).toFixed(2);
//         const price = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//         const change = priceData.ticker.change;
//         const percent = ((change / num) * 100);
//         ticker.nextElementSibling.textContent = `$${price}`;
//         // square = `${percent.toFixed(2)}%`;
//     }
// }
const getData = async function (){
    let urls = [];
    for (let ticker of tickers){
        urls.push(`https://api.cryptonator.com/api/ticker/${ticker.textContent}-usd`)
    }
    let priceData = await Promise.all(
        urls.map(async url => {
                    let response = await fetch(url);
                    return response.json();
                })
            );
    for(let i = 0; i < priceData.length; i++){
        const num = parseFloat(priceData[i].ticker.price).toFixed(2);
        const price = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        prices[i].textContent = `$${price}`;
        const change = priceData[i].ticker.change;
        const percent = ((change / num) * 100);
        changes[i].textContent = `${percent.toFixed(2)}%`;
    }
}
getData();
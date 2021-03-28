const tickers = document.querySelectorAll('.ticker');
const prices = document.querySelectorAll('.price');
const changes = document.querySelectorAll('.change')
const squares = document.querySelectorAll('.square')

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
        changes[i].textContent = `${percent.toFixed(2)}`;
    }
    for (let change of changes){
        let num = parseFloat(change.textContent);
        if(Math.sign(num) === 1 || Math.sign(num) === 0){
            change.textContent = `+${num}%`;
        } else {
            change.parentElement.style.backgroundColor = 'red';
            change.textContent = `${num}%`;
        }
    }
    setTimeout(function(){
        getData();
    }, 30000);
}
getData();
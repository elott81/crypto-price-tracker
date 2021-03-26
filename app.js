const squares = document.querySelectorAll('.square')

const getData = async function (){
    const r = await fetch(`https://api.cryptonator.com/api/ticker/btc-usd`);
    const priceData = await r.json();
    console.log(priceData)
    const ticker = priceData.ticker.base;
    const price = parseFloat(priceData.ticker.price).toFixed(2)
    const change = priceData.ticker.change;
    const percent = ((change / price) * 100);
    console.log(percent.toFixed(2));
    for(let square of squares){
        square.childNodes[1].textContent = `${ticker}`;
        square.childNodes[3].textContent = `${price}`;
        square.childNodes[5].textContent = `${percent.toFixed(2)}`;
    }
}

getData();
const getData = async function (){
    const r = await fetch(`https://api.cryptonator.com/api/ticker/btc-usd`);
    const priceData = await r.json();
    console.log(priceData);
}

getData();
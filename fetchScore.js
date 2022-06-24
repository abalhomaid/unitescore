//Option with catch

var textURL = 'https://uniteapi.dev/p/xsiegmeyerx';

var myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Origin', 'https://uniteapi.dev/');

fetch(textURL, {
    mode: 'cors',
    headers: myHeaders,
  })
  .then(async r => console.log(await r.text()))
  .catch(e => console.error('Boo...' + e));

// (async () =>
//   console.log(
//     (await (await fetch(jsonURL)).json())
//   ))();

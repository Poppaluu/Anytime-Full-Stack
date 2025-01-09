import url from 'url';

const urlString = 'https://www.google.com/search?q=node+js';

//URL object
const urlObj = new URL(urlString);

console.log(urlObj);

//format()
console.log(url.format(urlObj));

//import.meta.url - file url
console.log(import.meta.url);

//fileURLToPath()
console.log(url.fileURLToPath(import.meta.url));

console.log(urlObj.search); // ?q=node+js
const params = new URLSearchParams(urlObj.search);
console.log(params.get('q')); // node js
console.log(params.has('q')); // true
params.append('limit', 10);
params.delete('q');
console.log(params);
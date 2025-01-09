//import fs from 'fs';
import fs from 'fs/promises';

//readFile() - callback
/*
fs.readFile('Learning diary node js.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});


//readFileSync() - synchronous
const data = fs.readFileSync('Learning diary node js.txt', 'utf8');
console.log(data);


//readFile() - promise .then()
fs.readFile('Learning diary node js.txt', 'utf8')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

*/

//readFile() - promise async/await
const readFile = async () => {
    try {
        const data = await fs.readFile('Learning diary node js.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}


readFile();


const writeFile = async () => {
    try {
        await fs.writeFile('test.txt', 'Hello, Node.js!');
        console.log('File written successfully');
    } catch (err) {
        console.log(err);
    }
}

writeFile();


//appendFile()
const appendFile = async () => {
    try {
        await fs.appendFile('test.txt', '\nHello, Node.js!');
        console.log('Data appended successfully');
    } catch (err) {
        console.log(err);
    }
}

appendFile();
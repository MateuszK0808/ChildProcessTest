const emiter = require('events');
const util = require('util')

const myEmiter = new emiter();
console.log(`child ${process.pid} started`);

const short = (l) => {
    let wynik = 0;
    for(let i = 0; i < 100; i++)
    {
        wynik += i + l;
    }
    return wynik;
}

const long = (l) => {
    let wynik = 1;
    for(let i = 1; i < 1000; i++) {
        for(let j = 1; j < 1000; j++) {
            for(let k = 1; k < 2000; k++) {
                wynik = wynik/ i - k + j;
            }
        }
    }
    return wynik;
}

const functionObject = {
    short: short,
    long: long,
}

process.on("message", (msg, listener) => {
    
    const wynik = functionObject[msg.cmd](msg.i);
    process.send({wynik, counter: msg.i})

});





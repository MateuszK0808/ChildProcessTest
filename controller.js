const fork = require('child_process').fork;

const child = fork('./child.js');

let counter = 0;

child.on("exit", () => console.log("child padł"));

exports.shortCalculation = () => {
    const controlObject = { cmd: "short", i: counter }
    child.send(controlObject);
    counter++;
    console.log(child.listeners('message'));
    return new Promise((resolve, reject) => child.on("message", (msg) => {
        if (msg.counter === controlObject.i) {
            child.removeListener('message', child.listeners('message')[0])
            resolve(msg);
        }

    }));
}

exports.longCalculation = () => {
    const controlObject = { cmd: "long", i: counter }
    child.send(controlObject);
    counter++;
    console.log(child.listeners('message'));
    return new Promise((resolve, reject) => child.on("message", (msg) => {
        if (msg.counter === controlObject.i) {
            child.removeListener('message', child.listeners('message')[0]).
            resolve(msg);
        }
    }));
}
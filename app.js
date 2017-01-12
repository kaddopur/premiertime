#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const { getKeys, addTime } = require('./src/premiertime');
const { version } = require('./package.json');

program
    .version(version)
    .usage('[options] <file ...>');

program.parse(process.argv);

// init file names
const inputFileName = program.args[0];
const matcher = inputFileName.match(/([^\/]*).csv$/);
const outputFileName = `${matcher[1]}.output.csv`;

// read files
const raw = fs.readFileSync(inputFileName).toString();
const data = raw.split(/\s+/)
    .filter(entry => /.*,\d+:\d+/.test(entry))
    .reduce((acc, entry) => {
        const [name, time] = entry.split(',');

        acc.push({
            name,
            time
        });
        return acc;
    }, []);
const keys = getKeys(data);
const times = keys.reduce((acc, name) => {
    const timeForKey = data
        .filter(entry => entry.name === name)
        .map(entry => entry.time)
        .reduce((acculateTime, time) => addTime(acculateTime, time), '0:00');

    acc.push({
        name,
        time: timeForKey
    });
    return acc;
}, []);
const totalTime = times.reduce((acc, entry) => addTime(acc, entry.time), '0:00');

console.log(times, totalTime);

// write result
const outputFd = fs.open(`./${outputFileName}`, 'w', (err, fd) => {
    times.forEach(entry => {
        fs.write(fd, `${entry.name},${entry.time}\n`, () => {});
    });

    fs.write(fd, `total time,${totalTime}\n`, () => {});
});

// console.log(data);
// console.log(keys);

// (1). get unique key
// (2). read from csv and prase into time string array by key
// (3). reduce time string array by addTime and get total time xxxx:xxx

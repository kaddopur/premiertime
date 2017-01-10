const _ = require('lodash');
const moment = require('moment');
const fs = require('fs');

function getKeys(data) {
    return _.uniqBy(data, 'name').map(entry => entry.name);
}

function addTime(a, b) {
    const durA = moment.duration(a);
    const durB = moment.duration(b);
    const sum = durA.add(durB);
    const hour = Math.floor(sum.asHours());
    const minute = ('00' + sum.minutes()).slice(-2);

    return `${hour}:${minute}`;
}

module.exports = {
    getKeys: getKeys,
    addTime: addTime
};

const raw = fs.readFileSync('./data.csv').toString();
const data = raw.split('\n')
    .filter(entry => /^.*,\d+:\d+$/.test(entry))
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
    const totalTime = data
        .filter(entry => entry.name === name)
        .map(entry => entry.time)
        .reduce((acculateTime, time) => addTime(acculateTime, time), '0:00');

    acc.push({
        name,
        time: totalTime
    });
    return acc;
}, []);

console.log(times);

const outputFd = fs.open('./output.csv', 'w', (err, fd) => {
    times.forEach(entry => {
        fs.write(fd, `${entry.name},${entry.time}\n`, () => {});
    });
});

// console.log(data);
// console.log(keys);

// (1). get unique key
// (2). read from csv and prase into time string array by key
// (3). reduce time string array by addTime and get total time xxxx:xxx

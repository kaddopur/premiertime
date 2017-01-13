const _ = require('lodash');
const moment = require('moment');

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

function parseRaw(raw) {
    return raw
        .split(/\s+/)
        .filter(entry => /.*,\d+:\d+/.test(entry))
        .reduce((acc, entry) => {
            const [name, time] = entry.split(',');

            acc.push({
                name,
                time
            });
            return acc;
        }, []);
}

module.exports = {
    getKeys,
    addTime,
    parseRaw
};

var _ = require('lodash');
var moment = require('moment');
var fs = require('fs');

function getKeys(data) {
    return _.uniqBy(data, 'name').map(function(entry) {
        return entry.name;
    });
}

function addTime(a, b) {
    var durA = moment.duration(a);
    var durB = moment.duration(b);
    var sum = durA.add(durB);
    var hour = Math.floor(sum.asHours());
    var minute = ('00' + sum.minutes()).slice(-2);

    return `${hour}:${minute}`;
}

module.exports = {
    getKeys: getKeys,
    addTime: addTime
};

var raw = fs.readFileSync('./data.csv').toString();
var data = raw.split('\n')
    .filter(function(entry) {
        return /^.*,\d+:\d+$/.test(entry);
    })
    .reduce(function(acc, entry) {
        // entry 'dog,3:33'

        var content = entry.split(',');

        acc.push({
            name: content[0],
            time: content[1]
        });
        return acc;
    }, []);
var keys = getKeys(data);
var times = keys.reduce(function(acc, key) {
    var totalTime = data.filter(function(entry) {
        return entry.name === key;
    }).map(function(entry) {
        return entry.time;
    }).reduce(function(acculateTime,time) {
        return addTime(acculateTime, time);
    }, '0:00');

    acc.push({
        name: key,
        time: totalTime
    });
    return acc;
}, []);

console.log(times);

var outputFd = fs.open('./output.csv', 'w', function (err, fd) {
    times.forEach(function(entry) {
        fs.write(fd, `${entry.name},${entry.time}\n`, function(){});
    });
});



// console.log(data);
// console.log(keys);



// (1). get unique key
// 2. read from csv and prase into time string array by key
// 3. reduce time string array by addTime and get total time xxxx:xxx

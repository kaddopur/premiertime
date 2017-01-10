var _ = require('lodash');

function getKeys(data) {
    return _.uniqBy(data, 'name').map(function(entry) {
        return entry.name;
    });
}

function addTime(a, b) {
    return 'xxxxx:xx';
}

module.exports = {
    getKeys: getKeys,
    addTime: addTime
};

// 1. get unique key
// 2. read from csv and prase into time string array by key
// 3. reduce time string array by addTime and get total time xxxx:xxx

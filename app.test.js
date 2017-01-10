var app = require('./app');
var fs = require('fs');

describe('#getKeys', function () {
    it('should handle empty data array', function () {
        expect(app.getKeys([])).toEqual([]);
    });

    it('should return correct keys', function () {
        expect(app.getKeys([
            {
                name: 'dog',
                time: '3:33'
            }
        ])).toEqual(['dog']);
    });

    it('should return different keys', function () {
        expect(app.getKeys([
            {
                name: 'dog',
                time: '3:33'
            },
            {
                name: 'cat',
                time: '0:59'
            }
        ])).toEqual(['dog', 'cat']);
    });

    it('should return unique keys', function () {
        expect(app.getKeys([
            {
                name: 'dog',
                time: '3:33'
            },
            {
                name: 'cat',
                time: '0:59'
            },
            {
                name: 'dog',
                time: '1:34'
            },
        ])).toEqual(['dog', 'cat']);
    });
});

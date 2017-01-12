var premiertime = require('./premiertime');

describe('#getKeys', function () {
    it('should handle empty data array', function () {
        expect(premiertime.getKeys([])).toEqual([]);
    });

    it('should return correct keys', function () {
        expect(premiertime.getKeys([
            {
                name: 'dog',
                time: '3:33'
            }
        ])).toEqual(['dog']);
    });

    it('should return different keys', function () {
        expect(premiertime.getKeys([
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
        expect(premiertime.getKeys([
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

describe('#addTime', function () {
    it('should add up two time', function () {
        expect(premiertime.addTime('0:01', '0:02')).toBe('0:03');
        expect(premiertime.addTime('0:30', '0:42')).toBe('1:12');
    });

    it('should not add up to day', function () {
        expect(premiertime.addTime('23:59', '0:02')).toBe('24:01');
        expect(premiertime.addTime('24:00', '30:02')).toBe('54:02');
    });
});

const { addTime, getKeys, parseRaw } = require('./premiertime');

describe('#getKeys', () => {
    it('should handle empty data array', () => {
        expect(getKeys([])).toEqual([]);
    });

    it('should return correct keys', () => {
        expect(getKeys([
            {
                name: 'dog',
                time: '3:33'
            }
        ])).toEqual(['dog']);
    });

    it('should return different keys', () => {
        expect(getKeys([
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

    it('should return unique keys', () => {
        expect(getKeys([
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

describe('#addTime', () => {
    it('should add up two time', () => {
        expect(addTime('0:01', '0:02')).toBe('0:03');
        expect(addTime('0:30', '0:42')).toBe('1:12');
    });

    it('should not add up to day', () => {
        expect(addTime('23:59', '0:02')).toBe('24:01');
        expect(addTime('24:00', '30:02')).toBe('54:02');
    });
});

describe('#parseRaw', () => {
    it('should handle different CRLF', () => {
        expect(parseRaw('foo,10:10\r\nbar,00:05\r\n')).toEqual([
            {
                name: 'foo',
                time: '10:10'
            },
            {
                name: 'bar',
                time: '00:05'
            }
        ]);
        expect(parseRaw('foo,10:10\nbar,00:05\n')).toEqual([
            {
                name: 'foo',
                time: '10:10'
            },
            {
                name: 'bar',
                time: '00:05'
            }
        ]);
        expect(parseRaw('foo,10:10\rbar,00:05\r')).toEqual([
            {
                name: 'foo',
                time: '10:10'
            },
            {
                name: 'bar',
                time: '00:05'
            }
        ]);
    });
});

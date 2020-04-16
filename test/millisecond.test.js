import test from 'tape';
import M, { getTypeOutput } from '../src/millisecond';

test('M()', t => {
    t.test('should return an object', tt => {
        const actual = typeof M(3);
        const expected = 'object';
        tt.strictEqual(actual, expected);

        tt.end();
    });

    t.test('should be an instanceof M', tt => {
        const actual = M(3) instanceof M;
        tt.ok(actual);

        tt.end();
    });
});

test('M().seconds()', t => {
    t.test('should return a number', tt => {
        const actual = typeof M(3).seconds();
        const expected = 'number';
        tt.strictEqual(actual, expected);

        tt.end();
    });

    t.test('should return n seconds in milliseconds', tt => {
        {
            const actual = M(3).seconds();
            const expected = 3000;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        }

        {
            const actual = M(-3).seconds();
            const expected = -3000;
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        }

        tt.end();
    });
});

test('M().minutes()', t => {
    t.test('should return a number', tt => {
        const actual = typeof M(3).minutes();
        const expected = 'number';
        tt.strictEqual(actual, expected);

        tt.end();
    });

    t.test('should return n minutes in milliseconds', tt => {
        {
            const actual = M(3).minutes();
            const expected = 180000;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        }

        {
            const actual = M(-3).minutes();
            const expected = -180000;
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        }

        tt.end();
    });
});

test('M().hours()', t => {
    t.test('should return a number', tt => {
        const actual = typeof M(3).hours();
        const expected = 'number';
        tt.strictEqual(actual, expected);

        tt.end();
    });

    t.test('should return n hours in milliseconds', tt => {
        {
            const actual = M(3).hours();
            const expected = 10800000;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        }

        {
            const actual = M(-3).hours();
            const expected = -10800000;
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        }

        tt.end();
    });
});

test('M().days()', t => {
    t.test('should return a number', tt => {
        const actual = typeof M(3).days();
        const expected = 'number';
        tt.strictEqual(actual, expected);

        tt.end();
    });

    t.test('should return n days in milliseconds', tt => {
        {
            const actual = M(3).days();
            const expected = 259200000;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        }

        {
            const actual = M(-3).days();
            const expected = -259200000;
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        }

        tt.end();
    });
});

test('M().weeks()', t => {
    t.test('should return a number', tt => {
        const actual = typeof M(3).weeks();
        const expected = 'number';
        tt.strictEqual(actual, expected);

        tt.end();
    });

    t.test('should return n weeks in milliseconds', tt => {
        {
            const actual = M(3).weeks();
            const expected = 1814400000;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        }

        {
            const actual = M(-3).weeks();
            const expected = -1814400000;
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        }

        tt.end();
    });
});

test('M().months()', t => {
    const validMonthsToMilliseconds = [
        [0, 8035200000],
        [1, 7257600000], // Leap year - 7516800000
        [2, 8035200000],
        [3, 7776000000],
        [4, 8035200000],
        [5, 7776000000],
        [6, 8035200000],
        [7, 8035200000],
        [8, 7776000000],
        [9, 8035200000],
        [10, 7776000000],
        [11, 8035200000],
    ];
    t.test('should throw if not given a valid first arg', tt => {
        tt.throws(() => { M(3).months(); }, TypeError, 'should throw when given no first argument');
        tt.throws(() => { M(3).months('foo'); }, TypeError, 'should throw when given a non-number first argument');
        tt.throws(() => { M(3).months(-1); }, TypeError, 'should throw when given an out-of-range number for the first argument (< 0)');
        tt.throws(() => { M(3).months(12); }, TypeError, 'should throw when given an out-of-range number for the first argument (> 11)');

        tt.end();
    });

    t.test('should return n months in milliseconds', tt => {
        validMonthsToMilliseconds.forEach(([month, ms]) => {
            const actual = M(3).months(month);
            const expected = ms;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        });

        validMonthsToMilliseconds.forEach(([month, ms]) => {
            const actual = M(-3).months(month);
            const expected = -(ms);
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        });

        tt.end();
    });

    t.test('should throw if not given a valid second argument', tt => {
        [null, 1, 'foo', Symbol('foo'), [], {}, () => { }].forEach(v => {
            tt.throws(() => { M(3).months(11, v); }, TypeError, `should throw when given a ${getTypeOutput(v)} as second argument`);
        })

        tt.end();
    });

    t.test('should return n months in milliseconds for Feb + Leap Year', tt => {
        {
            const actual = M(3).months(M.Feb, M.LeapYear);
            const expected = 7516800000;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        }

        {
            const actual = M(-3).months(M.Feb, M.LeapYear);
            const expected = -7516800000;
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        }

        tt.end();
    });
});

test('M().years()', t => {
    t.test('should throw if not given a valid first argument', tt => {
        [null, 1, 'foo', Symbol('foo'), [], {}, () => { }].forEach(v => {
            tt.throws(() => { M(3).years(v); }, TypeError, `should throw when given a ${getTypeOutput(v)} as first argument`);
        })

        tt.end();
    });

    t.test('should return a number', tt => {
        {
            const actual = typeof M(3).years();
            const expected = 'number';
            tt.strictEqual(actual, expected, 'should return a number with no/default args');
        }

        {
            const actual = typeof M(3).years(M.LeapYear);
            const expected = 'number';
            tt.strictEqual(actual, expected, 'should return number with `true` arg');
        }

        tt.end();
    });

    t.test('should return n years in milliseconds for non-leap years', tt => {
        {
            const actual = M(3).years();
            const expected = 94608000000;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        }

        {
            const actual = M(-3).years();
            const expected = -94608000000;
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        }

        tt.end();
    });

    t.test('should return n years in milliseconds for leap years', tt => {
        {
            const actual = M(3).years(M.LeapYear);
            const expected = 94867200000;
            tt.strictEqual(actual, expected, 'should return positive number with positive n');
        }

        {
            const actual = M(-3).years(M.LeapYear);
            const expected = -94867200000;
            tt.strictEqual(actual, expected, 'should return negative number with negative n');
        }

        tt.end();
    });
});

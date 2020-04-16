const getTypeOutput = v => {
    if (Array.isArray(v)) {
        return 'array';
    } else if (v == null) {
        return String(v);
    } else {
        return typeof v;
    }
};

const monthToDayCount = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
];

function M(n) {
    const inst = Object.create(M.prototype);
    inst.raw = () => n;
    return inst;
}

Object.assign(M, {
    // Constructor
    constructor: M,

    // Static variables
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,

    LeapYear: true,

    // Prototype
    prototype: {
        seconds() {
            return this.raw() * 1000;
        },
        minutes() {
            return this.seconds() * 60;
        },
        hours() {
            return this.minutes() * 60;
        },
        days() {
            return this.hours() * 24;
        },
        weeks() {
            return this.days() * 7;
        },
        months(month, isLeapYear = false) {
            if (typeof month !== 'number') {
                throw new TypeError(`.months() expects a number as its first argument. ${getTypeOutput(month)} given.`);
            }

            if (month >= monthToDayCount.length || month < 0) {
                throw new TypeError(`.months() expects first argument to be a number between 0 and 11. ${month} given.`);
            }

            if (typeof isLeapYear !== 'boolean') {
                throw new TypeError(`.months() expects a boolean as its second argument. ${getTypeOutput(isLeapYear)} given.`);
            }

            const dayModifier = month === M.Feb && isLeapYear ? 1 : 0;
            return this.days() * (monthToDayCount[month] + dayModifier);
        },
        years(isLeapYear = false) {
            if (typeof isLeapYear !== 'boolean') {
                throw new TypeError(`.years() expects a boolean as its first argument. ${getTypeOutput(isLeapYear)} given.`);
            }

            return this.days() * (!isLeapYear ? 365 : 366);
        },
    },
});

export default M;
export { getTypeOutput };

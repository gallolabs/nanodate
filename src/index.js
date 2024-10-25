import nanotime from 'node-system-time'

class NanoDate extends Date {
    constructor(value) {
        let nanoTimestamp

        if (!value) {
            nanoTimestamp = nanotime.getTimestamp()
        } else {
            if (typeof value === 'number') {
                throw new Error('Number is not supported')
            }

            if (typeof value === 'bigint') {
                nanoTimestamp = value
            }
        }

        if (nanoTimestamp) {
            const msTimestamp = Number(nanoTimestamp / 1000000n)
            const ns = Number(nanoTimestamp % 1000000000n)

            super(msTimestamp)

            this.ns = ns

        } else {
            if (arguments.length > 1) {
                super(...arguments)
                this.ns = arguments[7] || 0
            } else if (typeof value === 'string') {
                super(value)
                this.ns = (value.match(/(\d{9})Z$/) || [0, 0])[1]
            } else if (value instanceof Object) {
                super(value)
                this.ns = value.ns || value.milliseconds * 1000000 || 0
            }
        }
    }
    getTime() {
        return BigInt(super.getTime().toString() + this.ns.toString().substring(3))
    }
    toISOString() {
        return super.toISOString().replace('Z', `${this.ns.toString().substring(3).padStart(6, '0')}Z`)
    }
    setMilliseconds(ms) {
        const v = super.setMilliseconds(ms)
        this.ns = ms * 1000000
        return v
    }
    setNanoseconds(ns) {
        this.setMilliseconds(Math.floor(ns / 1000000))
        this.ns = ns
        return ns
    }
    getNanoseconds() {
        return this.ns
    }
}

const nanodate = new NanoDate
const date = new Date

console.log(date.toJSON(), nanodate.toJSON())
console.log(date.getTime(), nanodate.getTime())
console.log(date.toString(), nanodate.toString())
console.log(date.toLocaleString(), nanodate.toLocaleString())

console.log(date.toISOString(), nanodate.toISOString())

console.log(date, nanodate)

nanodate.setMilliseconds(555)

console.log(nanodate.toJSON(), nanodate.getMilliseconds(), nanodate.getNanoseconds())

nanodate.setNanoseconds(123555777)

console.log(nanodate.toJSON(), nanodate.getMilliseconds(), nanodate.getNanoseconds())

const nanodate2 = new NanoDate('2024-10-25T22:46:17.894315765Z')

console.log(nanodate2.toJSON())

const nanodate3 = new NanoDate(1729896770263078650n)

console.log(nanodate3.toJSON())


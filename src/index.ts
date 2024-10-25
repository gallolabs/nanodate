// @ts-ignore
import nanotime from 'node-system-time'

export default class NanoDate extends Date {
    protected ns: number = 0
    constructor(value?: bigint | string | object)
    constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ns?: number)
    constructor() {
        let nanoTimestamp
        const value = arguments[0]

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
                super(arguments[0], arguments[1], arguments[2] || 1, arguments[3] || 0, arguments[4] || 0, arguments[5] || 0, arguments[6] || 0)
                this.ns = arguments[6] || 0
            } else if (typeof value === 'string') {
                super(value)
                this.ns = parseInt((value.match(/(\d{9})Z$/) || ['0', '0'])[1], 10)
            } else if (value instanceof Object) {
                super(value)
                this.ns = value.ns || value.milliseconds * 1000000 || 0
            }
        }
    }
    // @ts-ignore
    getTime() {
        return BigInt(super.getTime().toString() + this.ns.toString().substring(3))
    }
    toISOString() {
        return super.toISOString().replace('Z', `${this.ns.toString().substring(3).padStart(6, '0')}Z`)
    }
    // Please dont call me, second fraction is now nanoseconds
    setMilliseconds(ms: number) {
        const v = super.setMilliseconds(ms)
        this.ns = ms * 1000000
        return v
    }
    setNanoseconds(ns: number) {
        this.setMilliseconds(Math.floor(ns / 1000000))
        this.ns = ns
        return ns
    }
    getNanoseconds() {
        return this.ns
    }
}

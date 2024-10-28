// @ts-ignore
import nanotime from 'node-system-time'

export default class NanoDate extends Date {
    protected ns: number = 0
    constructor(value?: bigint | string | object | number)
    constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ns?: number)
    constructor() {
        let nanoTimestamp
        const value = arguments[0]

        if (arguments.length < 2) {
            if (!value) {
                nanoTimestamp = nanotime.getTimestamp()
            } else {
                if (typeof value === 'number') {
                    nanoTimestamp = BigInt(value)
                }

                if (typeof value === 'bigint') {
                    nanoTimestamp = value
                }
            }

        }

        if (nanoTimestamp) {
            const msTimestamp = Number(nanoTimestamp / 1000000n)
            const ns = Number(nanoTimestamp % 1000000000n)

            super(msTimestamp)

            this.ns = ns

        } else {
            if (arguments.length > 1) {
                const args = [...arguments]
                // if (args.includes(undefined)) {
                //     const rest = args.splice(args.indexOf(undefined), 6)
                //     if (rest.some(v => v !== undefined)){
                //         throw new Error('Cannot set value after undefined arg')
                //     }
                // }

                if (arguments[6] !== undefined) {
                    args[6] = Math.floor(args[6] / 1000000)
                }
                // @ts-ignore
                super(...args)
                this.ns = arguments[6] || 0n
            } else if (typeof value === 'string') {
                super(value)
                this.ns = parseInt((value.match(/\.(\d{1,9})/) || ['0', '0'])[1].padEnd(9, '0'), 10)
            } else if (value instanceof Object) {
                super(value)
                this.ns = value.ns || value.milliseconds * 1000000 || 0
            }
        }
    }
    // @ts-ignore
    getTime() {
        return isNaN(super.getTime()) ? NaN : BigInt(super.getTime().toString() + this.ns.toString().substring(3).padStart(6, '0'))
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
    valueOf() {
        return Number(this.getTime())
    }
    static now() {
        return (new NanoDate).getTime()
    }
    static UTC(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ns?: number): bigint
    static UTC() {
        return (new NanoDate(...arguments)).getTime()
    }
    static parse(dateString: string) {
        return (new NanoDate(dateString)).getTime()
    }
}

// @ts-ignore
import nanotime from 'node-system-time'

export default class NanoDate extends Date {
    protected ns: number = 0
    constructor(value?: bigint | string | number | Date | NanoDate)
    constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ns?: number)
    constructor() {
        let nanoTimestamp
        const value = arguments[0]

        if (arguments.length < 2) {
            if (!value) {
                nanoTimestamp = nanotime.getTimestamp()
            } else {
                if (value instanceof NanoDate || value instanceof Date) {
                    nanoTimestamp = BigInt(value.getTime())
                }

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
            }
        }
    }
    // @ts-ignore
    getTime() {
        const s = super.getTime()
        return isNaN(s)
            ? NaN
            : BigInt(s.toString() + this.ns.toString().padStart(9, '0').substring(3))
    }
    toISOString() {
        return super.toISOString().slice(0, 23) + `${this.ns.toString().padStart(9, '0').substring(3)}Z`
    }
    getMilliseconds(): number {
        throw new Error('To destroy')
    }
    setMilliseconds(): number {
        throw new Error('To destroy')
    }
    setNanoseconds(ns: number) {
        super.setMilliseconds(Math.floor(ns / 1000000))
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

import NanoDate from './index.js'

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
console.log(nanodate3.getTime())
console.log(+nanodate3)
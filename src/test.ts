import assert from 'assert'
import NanoDate from './index.js'

describe('NanoDate', () => {

	it('bad construct', () => {
		assert.strictEqual((new NanoDate(2024, 4, undefined)).getTime(), NaN)
	})

	it('construct with datetime without second fraction and offset', () => {
		const nanodate = new NanoDate('2024-10-25T22:46:17+02:00')

		assert.strictEqual(nanodate.toJSON(), '2024-10-25T20:46:17.000000000Z')
	})

	it('construct with datetime without second fraction and Z', () => {
		const nanodate = new NanoDate('2024-10-25T22:46:17Z')

		assert.strictEqual(nanodate.toJSON(), '2024-10-25T22:46:17.000000000Z')
	})

	it('construct with datetime with second fraction and offset', () => {
		const nanodate = new NanoDate('2024-10-25T22:46:17.123456789+02:00')

		assert.strictEqual(nanodate.toJSON(), '2024-10-25T20:46:17.123456789Z')
	})

	it('construct with datetime with second partial fraction and offset', () => {
		const nanodate = new NanoDate('2024-10-25T22:46:17.123456+02:00')

		assert.strictEqual(nanodate.toJSON(), '2024-10-25T20:46:17.123456000Z')
	})

	it('construct with datetime with second partial fraction and Z', () => {
		const nanodate = new NanoDate('2024-10-25T22:46:17.123456Z')

		assert.strictEqual(nanodate.toJSON(), '2024-10-25T22:46:17.123456000Z')
	})

	it('construct with 0 beginning fraction', () => {
		const nanodate = new NanoDate('2024-10-25T22:46:17.023456341Z')

		assert.strictEqual(nanodate.toJSON(), '2024-10-25T22:46:17.023456341Z')
	})

	it('to split', () => {

		const nanodate = new NanoDate
		const date = new Date

		console.log(date.toJSON(), nanodate.toJSON())
		console.log(date.getTime(), nanodate.getTime())
		console.log(date.toString(), nanodate.toString())
		console.log(date.toLocaleString(), nanodate.toLocaleString())

		console.log(date.toISOString(), nanodate.toISOString())

		console.log(date, nanodate)

		nanodate.setNanoseconds(123555777)

		console.log(nanodate.toJSON(), nanodate.getNanoseconds())

		const nanodate3 = new NanoDate(1729896770263078650n)

		console.log(nanodate3.toJSON())
		console.log(nanodate3.getTime())
		console.log(+nanodate3)

		const nanodate4 = new NanoDate(+nanodate3)

		console.log(nanodate4.toJSON())

		console.log(NanoDate.now())

		console.log(NanoDate.UTC(2023, 4))

		console.log(NanoDate.parse('2024-10-25T22:46:17.894315765Z'))

	})

})
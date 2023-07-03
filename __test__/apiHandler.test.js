import { queryInit } from '../src/client/js/apiHandler'

describe('converts a data object into a query string for api calls',() => {
    test('', () => {
        const data = {foo: 'bar'}

        expect(queryInit(data)).toBe('foo=bar')
    })
})
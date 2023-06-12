
import { daysCalculator } from "../src/client/js/daysCalculator";

describe( "calculates the number of days between two dates.", () => {
    test("Testing the calculation function", () => {
        const start = new Date("01/04/1998")
        const end = new Date("01/07/1998")

        expect(daysCalculator(start,end)).toBe(3);

    })
})
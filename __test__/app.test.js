
import { addTrip } from "../src/client/js/app";

describe( "appends an item to an array", () => {
    test("Testing the function", () => {
        const Trip_Array = []

        expect(addTrip("test")).toBeDefined();

    })
})
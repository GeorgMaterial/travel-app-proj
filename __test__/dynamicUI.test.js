import {capitalizeFirstLetter} from '../src/client/js/dynamicUI'


describe( "Capitalizes the first letter for each word in a phrase", () => {
    test("Testing the overall function", () => {
        const phrase = "the boy was upset with his mother."

        expect(capitalizeFirstLetter(phrase)).toBe("The Boy Was Upset With His Mother.");

    })
})
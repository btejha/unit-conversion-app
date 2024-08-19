const {grade} = require('../grader');
const {convert} = require('../conversions');

// Mock the convert function from conversions module
jest.mock('../conversions');

describe('grade function', () => {

    beforeEach(() => {
        // Reset the mock before each test
        convert.mockReset();
    });

    test('should return "Correct" when the student response matches the rounded correct answer', () => {
        convert.mockReturnValue(37.77778); // Mocking a conversion from Fahrenheit to Celsius

        const result = grade(100, 'F', 'C', 37.8);

        expect(result).toEqual({
            correctAnswer: 37.8,
            studentResponse: 37.8,
            status: 'Correct'
        });
    });

    test('should return "Incorrect" when the student response does not match the rounded correct answer', () => {
        convert.mockReturnValue(37.77778); // Mocking a conversion from Fahrenheit to Celsius

        const result = grade(100, 'F', 'C', 38.0);

        expect(result).toEqual({
            correctAnswer: 37.8,
            studentResponse: 38.0,
            status: 'Incorrect'
        });
    });

    test('should return "Invalid" when the conversion is not possible', () => {
        convert.mockReturnValue(null); // Mocking an invalid conversion

        const result = grade(100, 'F', 'unknownUnit', 50.0);

        expect(result).toEqual({
            correctAnswer: null,
            studentResponse: 50.0,
            status: 'Invalid'
        });
    });

    test('should return "Invalid" when the student response is not a number', () => {
        convert.mockReturnValue(37.77778); // Mocking a conversion from Fahrenheit to Celsius

        const result = grade(100, 'F', 'C', 'notANumber');

        expect(result).toEqual({
            correctAnswer: 37.8,
            studentResponse: NaN,
            status: 'Invalid'
        });
    });

    test('should handle rounding correctly when correct answer is exactly halfway', () => {
        convert.mockReturnValue(37.75); // Mocking a conversion result

        const result = grade(100, 'F', 'C', 37.7);

        expect(result).toEqual({
            correctAnswer: 37.8,
            studentResponse: 37.7,
            status: 'Incorrect'
        });
    });

});

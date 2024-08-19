const {convert} = require('../conversions');

describe('convert function', () => {

    // Test temperature conversions
    describe('Temperature Conversions', () => {
        test('should convert Kelvin to Celsius correctly', () => {
            expect(convert(273.15, 'kelvin', 'celsius')).toBe(0);
        });

        test('should convert Celsius to Kelvin correctly', () => {
            expect(convert(0, 'celsius', 'kelvin')).toBe(273.15);
        });

        test('should convert Fahrenheit to Celsius correctly', () => {
            expect(convert(32, 'fahrenheit', 'celsius')).toBe(0);
        });

        test('should convert Celsius to Fahrenheit correctly', () => {
            expect(convert(100, 'celsius', 'fahrenheit')).toBe(212);
        });

        test('should convert Rankine to Fahrenheit correctly', () => {
            expect(convert(459.67, 'rankine', 'fahrenheit')).toBe(0);
        });

        test('should return null for unsupported temperature conversion', () => {
            expect(convert(100, 'celsius', 'unsupportedUnit')).toBeNull();
        });
    });

    // Test volume conversions
    describe('Volume Conversions', () => {
        test('should convert Liters to Gallons correctly', () => {
            expect(convert(3.785, 'liters', 'gallons')).toBeCloseTo(1);
        });

        test('should convert Gallons to Liters correctly', () => {
            expect(convert(1, 'gallons', 'liters')).toBeCloseTo(3.785);
        });

        test('should convert Cups to Tablespoons correctly', () => {
            expect(convert(1, 'cups', 'tablespoons')).toBe(16);
        });

        test('should convert Tablespoons to Cups correctly', () => {
            expect(convert(16, 'tablespoons', 'cups')).toBe(1);
        });

        test('should return null for unsupported volume conversion', () => {
            expect(convert(1, 'liters', 'unsupportedUnit')).toBeNull();
        });
    });

    // Test edge cases and errors
    describe('Edge Cases and Errors', () => {
        test('should return null for unsupported conversion type', () => {
            expect(convert(1, 'unsupportedUnit', 'celsius')).toBeNull();
        });

        test('should return null when fromUnit is incorrect', () => {
            expect(convert(1, 'incorrectUnit', 'celsius')).toBeNull();
        });

        test('should handle incorrect unit casing by returning null', () => {
            expect(convert(1, 'Liters', 'gallons')).toBeNull(); // assuming correct casing is 'liters'
        });

        test('should return null for empty fromUnit and toUnit', () => {
            expect(convert(1, '', '')).toBeNull();
        });

        test('should handle numbers that require precision correctly', () => {
            expect(convert(1.0001, 'liters', 'tablespoons')).toBeCloseTo(67.634);
        });
    });

});

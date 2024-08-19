const conversions = {
    kelvin: {
        toCelsius: (value) => value - 273.15,
        toFahrenheit: (value) => (value - 273.15) * 9/5 + 32,
        toRankine: (value) => value * 9/5,
    },
    celsius: {
        toKelvin: (value) => value + 273.15,
        toFahrenheit: (value) => (value * 9/5) + 32,
        toRankine: (value) => (value + 273.15) * 9/5,
    },
    fahrenheit: {
        toCelsius: (value) => (value - 32) * 5/9,
        toKelvin: (value) => (value - 32) * 5/9 + 273.15,
        toRankine: (value) => value + 459.67,
    },
    rankine: {
        toCelsius: (value) => (value - 491.67) * 5/9,
        toKelvin: (value) => value * 5/9,
        toFahrenheit: (value) => value - 459.67,
    },
    liters: {
        toTablespoons: (value) => value * 67.628,
        toCubicInches: (value) => value * 61.024,
        toCups: (value) => value * 4.227,
        toCubicFeet: (value) => value / 28.317,
        toGallons: (value) => value / 3.785,
    },
    tablespoons: {
        toLiters: (value) => value / 67.628,
        toCubicInches: (value) => value * 0.921,
        toCups: (value) => value / 16,
        toCubicFeet: (value) => value / 1152,
        toGallons: (value) => value / 256,
    },
    cubicInches: {
        toLiters: (value) => value / 61.024,
        toTablespoons: (value) => value * 1.096,
        toCups: (value) => value / 14.437,
        toCubicFeet: (value) => value / 1728,
        toGallons: (value) => value / 231,
    },
    cups: {
        toLiters: (value) => value / 4.227,
        toTablespoons: (value) => value * 16,
        toCubicInches: (value) => value * 14.437,
        toCubicFeet: (value) => value / 118,
        toGallons: (value) => value / 16,
    },
    cubicFeet: {
        toLiters: (value) => value * 28.317,
        toTablespoons: (value) => value * 1173.000,
        toCubicInches: (value) => value * 1728,
        toCups: (value) => value * 118,
        toGallons: (value) => value * 7.48,
    },
    gallons: {
        toLiters: (value) => value * 3.785,
        toTablespoons: (value) => value * 256,
        toCubicInches: (value) => value * 231,
        toCups: (value) => value * 16,
        toCubicFeet: (value) => value / 7.48,
    },

};

const convert = (value, fromUnit, toUnit) => {
    console.log("value, fromUnit, toUnit ******", value, fromUnit, toUnit);

    // Ensure fromUnit and toUnit are in the correct case and format
    const toFunctionName = `to${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`;

    // Check if the conversion function exists
    if (conversions[fromUnit] && typeof conversions[fromUnit][toFunctionName] === 'function') {
        return conversions[fromUnit][toFunctionName](value);
    }else{
        console.error(`Conversion from ${fromUnit} to ${toUnit} not supported.`);
        return null;
    }
    /*
        // Log error and return null if the conversion function does not exist
        console.error(`Conversion from ${fromUnit} to ${toUnit} not supported.`);
        return null;*/
};

module.exports = { convert };

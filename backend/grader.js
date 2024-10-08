const {convert} = require('./conversions');

const roundToTenths = (value) => {
    return Math.round(value * 10) / 10;
};

const grade = (inputValue, fromUnit, toUnit, studentResponse) => {

    const correctAnswer = convert(inputValue, fromUnit, toUnit);


    // Check if the conversion result is valid
    if (correctAnswer === null) {
        return {
            correctAnswer: null,
            studentResponse: parseFloat(studentResponse),
            status: 'Invalid'
        };
    }

    // Round the correct answer and student response to the tenths place
    const roundedCorrectAnswer = roundToTenths(correctAnswer);
    const roundedStudentResponse = roundToTenths(studentResponse);
    
    let status;
    if (isNaN(studentResponse)) {
        status = 'Invalid';
    } else if (roundedCorrectAnswer === roundedStudentResponse) {
        status = 'Correct';
    } else {
        status = 'Incorrect';
    }

    return {
        correctAnswer: roundedCorrectAnswer,
        studentResponse: roundedStudentResponse,
        status
    };
};

module.exports = {grade};

import {shallowMount} from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ConversionForm from '@/components/ConversionForm.vue'; // Adjust the path as needed

const mock = new MockAdapter(axios);
describe('ConversionForm.vue', () => {
    let wrapper;

    beforeEach(() => {
        // Clear all mocks before each test
        mock.reset();
        // Mount the component
        wrapper = shallowMount(ConversionForm);
    });

    test('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('form submission updates results', async () => {
        // Mock the API response
        const mockResponse = {
            correctAnswer: 32,
            status: 'correct'
        };
        mock.onPost('http://localhost:5000/api/grade').reply(200, mockResponse);

        // Set input values
        wrapper.setData({
            inputValue: 100,
            fromUnit: 'celsius',
            toUnit: 'fahrenheit',
            studentResponse: 32
        });

        // Submit the form
        await wrapper.vm.submitForm();

        // Check the result
        expect(wrapper.vm.result).toEqual(mockResponse);
        expect(wrapper.vm.results).toContainEqual({
            inputValue: 100,
            fromUnit: 'celsius',
            toUnit: 'fahrenheit',
            studentResponse: 32,
            correctAnswer: 32,
            status: 'correct'
        });
    });

    test('displays result in the table', async () => {
        // Mock the API response
        const mockResponse = {
            correctAnswer: 32,
            status: 'correct'
        };
        mock.onPost('http://localhost:5000/api/grade').reply(200, mockResponse);

        // Set input values
        wrapper.setData({
            inputValue: 100,
            fromUnit: 'celsius',
            toUnit: 'fahrenheit',
            studentResponse: 32
        });

        // Submit the form
        await wrapper.vm.submitForm();

        // Check if the result is displayed in the table
        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(1);

        const columns = rows.at(0).findAll('td');
        expect(columns.at(0).text()).toBe('100');
        expect(columns.at(1).text()).toBe('celsius');
        expect(columns.at(2).text()).toBe('fahrenheit');
        expect(columns.at(3).text()).toBe('32');
        expect(columns.at(4).text()).toBe('32');
        expect(columns.at(5).text()).toBe('correct');
    });

    test('handles error during form submission', async () => {
        // Mock the API to return an error
        mock.onPost('http://localhost:5000/api/grade').reply(500);

        // Set input values
        wrapper.setData({
            inputValue: 100,
            fromUnit: 'celsius',
            toUnit: 'fahrenheit',
            studentResponse: 32
        });

        // Spy on console.error to check if it's called
        console.error = jest.fn();

        // Submit the form
        await wrapper.vm.submitForm();

        // Check if console.error was called
        expect(console.error).toHaveBeenCalledWith('There was an error grading the response:', expect.any(Error));
    });
});

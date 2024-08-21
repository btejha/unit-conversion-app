<template>
  <div class="conversion-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="inputValue">Input Value:</label>
        <input v-model="inputValue" id="inputValue" required/>
      </div>
      <div class="form-group">
        <label for="fromUnit">From Unit:</label>
        <Multiselect
            v-model="fromUnit"
            :options="units"
            placeholder="Select a unit"
            label="fromUnit"
            id="fromUnit"
            :searchable="true"
            class="multiselect"
        />
        <span v-if="errors.fromUnit" class="error">{{ errors.fromUnit }}</span>
      </div>
      <div class="form-group">
        <label for="toUnit">To Unit:</label>
        <Multiselect
            v-model="toUnit"
            :options="units"
            placeholder="Select a unit"
            label="toUnit"
            id="toUnit"
            :searchable="true"
            class="multiselect"
        />
        <span v-if="errors.toUnit" class="error">{{ errors.toUnit }}</span>
      </div>
      <div class="form-group">
        <label for="studentResponse">Student Response:</label>
        <input v-model="studentResponse" id="studentResponse" required/>
        <span v-if="errors.studentResponse" class="error">{{ errors.studentResponse }}</span>
      </div>
      <button type="submit">Submit</button>
    </form>

    <table v-if="results.length">
      <thead>
      <tr>
        <th>Input Numerical Value</th>
        <th>Input Unit of Measure</th>
        <th>Target Unit of Measure</th>
        <th>Student Response</th>
        <th>Correct Answer</th>
        <th>Output</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(result, index) in results" :key="index">
        <td>{{ result.inputValue }}</td>
        <td>{{ result.fromUnit }}</td>
        <td>{{ result.toUnit }}</td>
        <td>{{ result.studentResponse }}</td>
        <td>{{ result.correctAnswer }}</td>
        <td>{{ result.status }}</td>
      </tr>
      </tbody>
    </table>

    <div v-if="result">
      <h3>Result:</h3>
      <p>Correct Answer: {{ result.correctAnswer }}</p>
      <p>Your Answer: {{ result.studentResponse }}</p>
      <p>Status: {{ result.status }}</p>
    </div>
  </div>

</template>

<script>
import Multiselect from '@vueform/multiselect/src/Multiselect.vue';

import axios from 'axios';
import '@vueform/multiselect/themes/default.css';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      inputValue: '',
      fromUnit: 'null',
      toUnit: 'null',
      studentResponse: '',
      result: null,
      results: [],
      units: ['kelvin', 'celsius', 'fahrenheit', 'rankine', 'liters', 'tablespoons', 'cubic-inches', 'cups', 'cubic-feet', 'gallons'],
      errors: {}
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      let isValid = true;
      if (!this.inputValue) {
        this.errors.inputValue = 'Input Value is required.';
        isValid = false;
      }
      if (!this.fromUnit) {
        this.errors.fromUnit = 'From Unit is required.';
        isValid = false;
      }
      if (!this.toUnit) {
        this.errors.toUnit = 'To Unit is required.';
        isValid = false;
      }
      if (!this.studentResponse) {
        this.errors.studentResponse = 'Student Response is required.';
        isValid = false;
      }
      return isValid;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/api/grade', {
          inputValue: parseFloat(this.inputValue),
          fromUnit: this.fromUnit,
          toUnit: this.toUnit,
          studentResponse: parseFloat(this.studentResponse),
        });
        this.result = response.data;
        // Add the result to the data table to display
        this.results.push({
          inputValue: this.inputValue,
          fromUnit: this.fromUnit,
          toUnit: this.toUnit,
          studentResponse: this.studentResponse,
          correctAnswer: response.data.correctAnswer,
          status: response.data.status
        });
      } catch (error) {
        console.error('There was an error grading the response:', error);
      }
    },
  },
};
</script>
<style scoped>
.conversion-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

label {
  flex: 1;
  margin-right: 10px;
  font-weight: bold;
}

input, select {
  flex: 2;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 30%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #ddd;
}

.multiselect {
  width: 100%;
  max-width: 400px; /* Adjust this value as needed */
  border: 1px solid black;
}

.error {
  color: red;
  font-size: 0.875em;
  margin-top: 5px;
}
</style>

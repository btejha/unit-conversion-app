<template>
  <div id="app">
    <h1>Unit Conversion Grader</h1>
    <ConversionForm/>
  </div>
</template>
<script>
import ConversionForm from './components/ConversionForm.vue';

export default {
  components: {
    ConversionForm,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

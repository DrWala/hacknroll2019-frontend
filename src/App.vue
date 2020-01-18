<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    {{my_variable}}
    {{my_questions}}
    {{my_answer}}
    <BarChart />
  </div>
</template>

<script>

import BarChart  from './components/BarChart'
export default {
  name: 'app',
  components: {
    'BarChart': BarChart,
  },
  data() {
    return {
      my_variable: "hello!",
      my_questions: null,
      my_answer: "test"
    }
  },
  mounted() { //to implement the method we implemented below
    // this.renderChart(data, options)
    // this.getData()
    // this.getUserQuestion()
    // this.getUserAnswer()
  },
  methods: {
    getData() { //return dob and gender
      this.$database.get_user(1, d => this.my_variable = d.val())
    },
    getUserQuestion() {
      this.$database.get_user_question_by_id(1,1,d => this.my_questions = d.val())
    },
    getUserAnswer() {
      this.$database.get_user_answers(1, d => this.my_answer = d.val())
    }
  }
}
</script>   

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

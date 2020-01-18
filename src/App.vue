<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    {{my_variable}}
    {{my_questions}}
    {{my_answer}}
    <canvas id="stat-chart"></canvas>
    <canvas id="scat-chart"></canvas>

  </div>
</template>

<script>
import Chart from "chart.js";
import planetChartData from "./planet-chart.js";

export default {
  name: "app",
  data() {
    return {
      my_variable: "hello!",
      my_questions: null,
      my_answer: "test"
    };
  },
  mounted() {
    //to implement the method we implemented below
    this.getData();
    this.getUserQuestion();
    this.getUserAnswer();
    // construct what you think data should look like for your chart
    let mythischart = {
      type: "bar",
      data: {
        labels: [ // change this
          "Mercury",
          "Venus",
          "Earth",
        ],
        datasets: [
          {
            //change this
            label: "Number of Moons",
            data: [15, 0, 1, 2]
          }
        ]
      },
      options: {
        responsive: true,
        lineTension: 100,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25
              }
            }
          ]
        }
      }
    };
    this.createChart("stat-chart", mythischart);
    let mythatchart = {
      type: 'scatter',
      data: {
          datasets: [{
              label: 'Scatter Dataset',
              data: [{
                  x: -10,
                  y: 0
              }, {
                  x: 0,
                  y: 10
              }, {
                  x: 10,
                  y: 5
              }]
          }]
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom'
              }]
          }
      }
      };
      this.createChart("scat-chart", mythatchart);
  },
  methods: {
    getData() {
      //return dob and gender
      this.$database.get_user(1, d => (this.my_variable = d.val()));
    },
    getUserQuestion() {
      this.$database.get_user_question_by_id(
        1,
        1,
        d => (this.my_questions = d.val())
      );
    },
    getUserAnswer() {
      this.$database.get_user_answers(1, d => (this.my_answer = d.val()));
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  }
};
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

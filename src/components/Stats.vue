<template>
    <div id="app">
        <canvas id="scat-chart"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";
export default {
    name: "app",
    data() {
        return {
            my_variable: "hello!",
            my_questions: null,
            my_answer: "test",
            chart_format: {
                type: "line",
                data: {
                    labels: [
                        // change this
                        "Sad",
                        "Ok I guess",
                        "Happy"
                    ],
                    datasets: [
                        {
                            //change this
                            label: "Frequency of Mood",
                            data: [100, 40, 60]
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
            }
        };
    },
    mounted() {
        //to implement the method we implemented below
        this.getData();
        this.getUserQuestion();
        this.getUserAnswer();
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
            this.$database.get_user_answers(1, d => {
                this.my_answer = d.val();
                let formatted_ans = this.formatData(this.my_answer);
                console.log(formatted_ans);
                this.createChartObject(formatted_ans);
            });
        },
        createChart(chartId, chartData) {
            const ctx = document.getElementById(chartId);
            const myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            });
        },
        formatData(user_answers) {
            let list_of_questions = ["1", "2", "3"];
            let all_keys = Object.keys(user_answers); //time
            let all_answers = Object.values(user_answers); //answers
            let chart_data = [];
            list_of_questions.forEach(q => {
                if (chart_data[q] === undefined) {
                    chart_data[q] = all_answers.map(ans => ans[q]);
                }
            });
            let chart_info = {
                chart_data: chart_data.filter(el => el != null),
                labels: all_keys
            };
            return chart_info;
        },
        createChartObject(formatted_data) {
            // Deep copy the chart formatting
            let chart_object = JSON.parse(JSON.stringify(this.chart_format));
            chart_object.data.datasets[0].data = formatted_data.chart_data[0];
            chart_object.data.labels = formatted_data.labels;
            this.createChart("scat-chart", chart_object);
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

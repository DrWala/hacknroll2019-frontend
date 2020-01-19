<template>
    <div id="app">
        <h1>Welcome to your check-in</h1>
        <canvas id="chart_1"></canvas>
        <canvas id="chart_2"></canvas>
        <canvas id="chart_3"></canvas>
        <canvas id="chart_4"></canvas>
        <canvas id="chart_5"></canvas>
        <canvas id="chart_6"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";
export default {
    name: "app",
    data() {
        return {
            user_id: null,
            my_variable: "hello!",
            my_questions: null,
            my_answer: "test",
            all_questions: null,
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
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.user_id = params.get("user_id");
        this.getData();
        this.getUserQuestion();
        this.getUserAnswer();
        this.getAllPresetQuestions()
    },
    methods: {
        getData() {
            //return dob and gender
            this.$database.get_user(
                this.user_id,
                d => (this.my_variable = d.val())
            );
        },
        getUserQuestion() {
            this.$database.get_user_question_by_id(
                this.user_id,
                1,
                d => (this.my_questions = d.val())
            );
        },
        getUserAnswer() {
            this.$database.get_user_answers(this.user_id, d => {
                this.my_answer = d.val();
                let formatted_ans = this.formatData(this.my_answer);
                console.log(formatted_ans);
                this.createChartObject("chart_1", 0, formatted_ans);
                this.createChartObject("chart_2", 1, formatted_ans);
                this.createChartObject("chart_3", 2, formatted_ans);
                this.createChartObject("chart_4", 3, formatted_ans);
                this.createChartObject("chart_5", 4, formatted_ans);
                this.createChartObject("chart_6", 5, formatted_ans);
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
        getAllPresetQuestions() {
            this.$database.get_preset_questions(d => this.all_questions = d.val());
        },
        createChartObject(chart_name, arr_id, formatted_data) {
            // Deep copy the chart formatting
            let chart_object = JSON.parse(JSON.stringify(this.chart_format));
            chart_object.data.datasets[0].data = formatted_data.chart_data[arr_id];
            chart_object.data.labels = formatted_data.labels;
            this.createChart(chart_name, chart_object);
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

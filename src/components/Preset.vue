<template>
    <div id="app">
        <h1>Preset questions</h1>
        <form id="form" v-on:submit.prevent="onSubmit">
            <div v-for="(question, id) in questions" :key="id">
                <label :for="question.question">{{ question.question }}</label>
                <input type="checkbox" v-model="user_questions" :value="id" />
                <!-- {{ id }}---{{ question }} -->
            </div>
            <button>
                Submit
            </button>
        </form>
    </div>
</template>

<script>
import Chart from "chart.js";
export default {
    name: "app",
    data() {
        return {
            form: {},
            user_id: null,
            questions: null,
            user_questions: []
        };
    },
    mounted() {
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.user_id = params.get("user_id");
        this.getPresetQuestions();
    },
    methods: {
        getPresetQuestions() {
            this.$database.get_preset_questions(d => {
                this.questions = d.val();
            });
        },
        onSubmit(){
            console.log(this.user_questions)
            this.$database.set_user_questions(this.user_id, this.user_questions);
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
#form {
    margin: 10% 20%;
    text-align: left;
}
</style>

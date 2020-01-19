import Vue from "vue";
import App from "./App.vue";
import StatsTemplate from "./components/Stats.vue";
import PresetTemplate from "./components/Preset.vue";
import database from "./firebase.js";

const hnr_db = new database();

Vue.config.productionTip = false;
Vue.prototype.$database = hnr_db;

const routes = {
    "/": StatsTemplate,
    "/preset": PresetTemplate
};

new Vue({
    data() {
        return {
            currentRoute: window.location.pathname
        };
    },
    computed: {
        ViewComponent() {
            return routes[this.currentRoute];
        }
    },
    render(h) {
        return h(this.ViewComponent);
    },
    components: { App }
}).$mount("#app");

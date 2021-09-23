// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    //to handle state
    state: {
        teams: []
    },

    //to handle state
    getters: {},


    //to handle mutations
    mutations: {
        setTeams(state, teams) {
            state.teams = teams;
        }
    },
    //to handle actions
    actions: {
        async fetchTeams({ commit, }) {
            var response = await axios.get("/api/dashboard/teams");
            commit('setTeams', response.data);
        }
    }
});

//var sleep = (ms) => {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}
//await sleep(1000);
// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
//to handle state
state: {
    teamsData: {
        teams: [ ]
    }
},

//to handle state
getters: {},


//to handle mutations
mutations: {
    setTeams(state, teams) {
        state.teamsData = { teams : teams };
    }
},
//to handle actions
actions: {
    async fetchTeams({commit,}) {
        var response = await axios.get("/api/dashboard/teams");
        //var sleep = (ms) => {
        //    return new Promise(resolve => setTimeout(resolve, ms));
        //}
        //await sleep(1000);
        commit('setTeams', response.data);
    }
}
});
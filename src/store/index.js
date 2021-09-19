// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vuex from 'vuex'

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
    async fetchTeams({commit}) {
        var teams = await axios.get("/api/dashboard/teams");
        commit('setTeams', teams);
    }
}
});
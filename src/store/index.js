// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    //to handle state
    state: {
        teams: [],
        teamsInfo: {},
        selectedTeams: []
    },

    //to handle state
    getters: {
        selectedTeamsInfo: (state) => {
            return state.selectedTeams.map((teamId) => state.teamsInfo[teamId]);
        }
    },


    //to handle mutations
    mutations: {
        setTeams(state, teams) {
            state.teams = teams;
        },
        setTeamInfo(state, {teamInfo, teamId}) {
            state.teamsInfo[teamId] = {
                data: teamInfo,
                name: state.teams.find((team) => team.id === teamId).name
            };
        },
        selectTeams(state, teamIds) {
            state.selectedTeams = [...new Set([...state.selectedTeams, ...teamIds])];
        },
        deselectTeam(state, teamId) {
            state.selectedTeams.splice(state.selectedTeams.findIndex((team) => team === teamId), 1);
        }
    },
    //to handle actions
    actions: {
        async fetchTeams({ commit }) {
            var response = await axios.get("/api/dashboard/teams");
            commit('setTeams', response.data);
        },
        async fetchTeamDetails({ commit }, teamId) {
            var response = await axios.get(`/api/dashboard/team?id=${teamId}`);
            commit('setTeamInfo', {teamInfo: response.data, teamId: teamId });
        }
    }
});

//var sleep = (ms) => {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}
//await sleep(1000);
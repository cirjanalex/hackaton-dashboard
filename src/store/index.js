// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    //to handle state
    state: {
        teams: undefined,
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
        setTeamInfo(state, { teamInfo, teamId }) {
            state.teamsInfo[teamId] = {
                data: teamInfo,
                name: state.teams.find((team) => team.id === teamId).name
            };
        },
        setSelectedTeams(state, selectedTeamIds) {
            state.selectedTeams = selectedTeamIds;
        },
        removeSelectedTeam(state, teamId) {
            state.selectedTeams.splice(state.selectedTeams.findIndex((team) => team === teamId), 1);
        }
    },
    //to handle actions
    actions: {
        async fetchTeams({ commit }) {
            var response = await axios.get("/api/dashboard/teams");
            commit('setTeams', response.data);
            await this.dispatch('selectTeams', {teamIds: response.data.map((team) => team.id), selected: true});
        },
        async fetchTeamDetails({ commit }, teamId) {
            var response = await axios.get(`/api/dashboard/team?id=${teamId}`);
            commit('setTeamInfo', { teamInfo: response.data, teamId: teamId });
            return response;
        },

        async selectTeams({ state, commit, dispatch }, { teamIds, selected }) {
            if (selected) {
                for (var i = 0; i < teamIds.length; i++) {
                    if (state.teamsInfo[teamIds[i]] === undefined)
                        await dispatch('fetchTeamDetails', teamIds[i]);
                }
                commit('setSelectedTeams', [...new Set([...state.selectedTeams, ...teamIds])]);
            }
            else {
                teamIds.forEach((teamId) => {
                    commit('removeSelectedTeam', teamId);
                });

            }
        }
    }
});

//var sleep = (ms) => {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}
//await sleep(1000);
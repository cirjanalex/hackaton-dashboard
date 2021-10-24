// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    //to handle state
    state: {
        teams: undefined,
        snapshotDate: undefined,
        orders: [],
        teamsInfo: [],
        selectedTeams: [],
        currentTeam: undefined
    },

    //to handle state
    getters: {
        selectedTeamsInfo: (state) => {
            return state.teamsInfo.filter(
                (teamsInfo) => state.selectedTeams.some((st) => st == teamsInfo.id))
        }
    },

    //to handle mutations
    mutations: {
        setTeams(state, data) {
            state.teams = data.teams;
            state.snapshotDate = data.date;
        },
        setCurrentTeam(state, teamId) {
            state.currentTeam = state.teams.filter(t => t.id == teamId)[0];
        },
        setTeamInfo(state, { teamInfo, teamId }) {
            let startIndex = state.teamsInfo.findIndex(ti => ti.id == teamId);
            var teamInfoObject = {
                data: teamInfo,
                name: state.teams.find((team) => team.id == teamId).name,
                id: teamId
            };
            if (startIndex !== -1) {
                state.teamsInfo.splice(startIndex, 1, teamInfoObject)
            }
            else {
                state.teamsInfo.push(teamInfoObject);
            }
        },
        setSelectedTeams(state, selectedTeamIds) {
            state.selectedTeams = selectedTeamIds;
        },
        removeSelectedTeam(state, teamId) {
            state.selectedTeams.splice(state.selectedTeams.findIndex((team) => team == teamId), 1);
        },
        storeOrders(state, { orders, teamId }) {
            var teamOrdersObject = {
                teamId: teamId,
                orders: orders
            };
            let startIndex = state.orders.findIndex((teamOrders) => teamOrders.teamId == teamId);
            if (startIndex !== -1) {
                state.orders.splice(startIndex, 1, teamOrdersObject);
            }
            else {
                state.orders.push(teamOrdersObject);
            }

        }
    },
    //to handle actions
    actions: {
        async fetchTeamsAndSelect({state, dispatch }) {
            await dispatch('fetchTeams');
            await dispatch('selectTeams', { teamIds: state.teams.map((team) => team.id), selected: true });
        },

        async fetchTeams({ commit }) {
            var response = await axios.get("/api/dashboard/teams");
            commit('setTeams', response.data);            
        },

        async fetchCurrentTeam({ state, commit, dispatch }, teamId) {
            if (state.teams === undefined) {
                await dispatch('fetchTeams');
            }
            commit("setCurrentTeam", teamId);
        },

        async fetchTeamDetails({ commit }, teamId) {
            var response = await axios.get(`/api/dashboard/team?id=${teamId}`);
            commit('setTeamInfo', { teamInfo: response.data, teamId: teamId });
            //return response;
        },

        async selectTeams({ state, commit, dispatch }, { teamIds, selected }) {
            if (selected) {
                for (var i = 0; i < teamIds.length; i++) {
                    if (!state.teamsInfo.some(ti => ti.id == teamIds[i]))
                        await dispatch('fetchTeamDetails', teamIds[i]);
                }
                commit('setSelectedTeams', [...new Set([...state.selectedTeams, ...teamIds])]);
            }
            else {
                teamIds.forEach((teamId) => {
                    commit('removeSelectedTeam', teamId);
                });
            }
        },

        async fetchOrders({ commit }, teamId) {
            var response = await axios.get(`/api/dashboard/orders?id=${teamId}`);
            commit('storeOrders', { orders: response.data, teamId: teamId });
        }
    }
});

//var sleep = (ms) => {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}
//await sleep(1000);
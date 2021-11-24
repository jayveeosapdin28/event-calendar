function initialState() {
    return {
        tableData: [],
        loading: false,
    }
}

const getters = {
    tableData: state => state.tableData,
    loading: state => state.loading
}

const actions = {
    fetchData({ commit, state }) {
        axios.get('api/event-calendar')
            .then(response => {
                commit('setTableData', response.data.data)
            })
            .finally(function(){
                commit('setLoading', false);
            })
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setTableData(state, data)
    {
        state.tableData = data;
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    },
    setLoading(state, status)
    {
        state.loading = status;
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}

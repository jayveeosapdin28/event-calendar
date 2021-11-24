import axios from "axios"

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    showConfirmButton: false,
})

function initialState() {
    return {
        item: {
            name: null,
            date_from: null,
            date_to: null,
            days: null,
        },
        weekDays: [
            {id: 0, label: 'Sun'},
            {id: 1, label: 'Mon'},
            {id: 2, label: 'Tue'},
            {id: 3, label: 'Wed'},
            {id: 4, label: 'Thu'},
            {id: 5, label: 'Fri'},
            {id: 6, label: 'Sat'},
        ],
        formErrors: [],
    }
}

const getters = {
    item: state => state.item,
    weekDays: state => state.weekDays,
    formErrors: state => state.formErrors
}

const actions = {
    storeData({commit, state, dispatch}) {
        return new Promise((resolve, reject) => {
            axios.post('api/event-calendar', state.item)
                .then(response => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Event successfully saved.'
                    })
                    commit('resetState')
                    resolve(response)
                })
                .catch(error => {
                    if(typeof error.response.data.errors != 'undefined')
                    {
                        commit('setFormErrors', error.response.data.errors)
                        Toast.fire({
                            icon: 'error',
                            title: 'Failed to save event.'
                        })
                        reject(error)
                    }
                });
        })
    },
    setItem({commit}, value) {
        commit('setItem', value)
    },
    setName({commit}, value) {
        commit('setName', value)
    },
    setDateFrom({commit}, value) {
        commit('setDateFrom', value)
    },
    setDateTo({commit}, value) {
        commit('setDateTo', value)
    },
    setDays({commit}, value) {
        commit('setDays', value)
    },
    setFormErrors({commit}, value) {
        commit('setFormErrors', value)
    },
    resetState({commit}) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, value) {
        state.item = value
    },
    setName(state, value) {
        state.item.name = value
    },
    setDateFrom(state, value) {
        state.item.date_from = value
    },
    setDateTo(state, value) {
        state.item.date_to = value
    },
    setDays(state, value) {
        state.item.days = value
    },
    setFormErrors(state, errors) {
        state.formErrors = errors;
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    }

}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}

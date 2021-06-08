import { createStore } from "vuex";
export default createStore({
    state: {
        token: '',
        role: 0
    },
    mutations: {
        SET_TOKEN: (state, value) => {
            state.token = value
        },
        SET_ROLE: (state, value) => {
            state.role = value
        },
    }
});
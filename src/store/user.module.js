import UserService from "../services/user.service";

const initialState = {data: {}};

export const user = {
    namespaced: true,
    state: initialState,
    actions: {
        profile({commit}) {
            return UserService.getProfile().then(
                userData => {
                    commit('profileSuccess', userData);
                    return Promise.resolve(userData);
                },
                error => {
                    commit('profileFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        profileSuccess(state, userData) {
            state.data = userData;
        },
        profileFailure(state) {
            state.data = null;
        }
    }
};
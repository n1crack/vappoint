import AppointmentService from "../services/appointment.service";

const initialState = {data: {}};

export const appointment = {
    namespaced: true,
    state: initialState,
    actions: {
        all({commit}) {
            return AppointmentService.all().then(
                appointmentData => {
                    commit('allSuccess', appointmentData);
                    return Promise.resolve(appointmentData);
                },
                error => {
                    commit('allFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        allSuccess(state, appointmentData) {
            state.data = appointmentData;
        },
        allFailure(state) {
            state.data = {};
        }
    }
};
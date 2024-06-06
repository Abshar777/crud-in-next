import { fn } from "./type";
import { user } from "./type";
export const signUp: fn<user> = (state, { payload }) => {
    state.email = payload.email;
    state.lastname = payload.lastname;
    state.firstname = payload.firstname;
    state._id = payload._id;
};

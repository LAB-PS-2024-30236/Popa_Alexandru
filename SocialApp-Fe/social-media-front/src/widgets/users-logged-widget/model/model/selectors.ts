import {RootState} from "../../../../redux/store";
export const usersSelect = ({
    totalNumberOfLoggedUsers: (state: RootState) => state.users.totalNumberOfLoggedUsers,
    usersLogged:(state: RootState)=> state.users.userLoggedRequestHelper,
});
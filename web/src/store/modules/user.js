import Cookies from 'js-cookie';

const user = {
    state: {
        userinfo: null,
        rememberUser: null
    },
    mutations: {
        logout(state) {
            Cookies.remove('roles');
            Cookies.remove('user');
            Cookies.remove('password');
            //localStorage.clear();
        },
        updateUserInfo(state, data) {
            state.userinfo = data
        },
        updateUser(state,data){
            state.rememberUser = data
        }
    }
};

export default user;
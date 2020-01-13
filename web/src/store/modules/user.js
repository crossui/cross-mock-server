import Cookies from 'js-cookie';

const user = {
    state: {
        userinfo: null
    },
    mutations: {
        logout(state) {
            Cookies.remove('roles');
            Cookies.remove('user');
            Cookies.remove('password');
            localStorage.clear();
        },
        updateUserInfo(state, data) {
            state.userinfo = data
        }
    }
};

export default user;
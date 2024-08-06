import { defineStore } from 'pinia';

const useUserStore = defineStore("user", {
    state: () => ({
        userInfo: null,
        isLogin: false,
        token: null
    }),
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
            this.isLogin = true;
        },
        setToken(token) {
            this.token = token
        },
        clearUserInfo() {
            this.userInfo = null;
            this.isLogin = false;
            this.token = null;
            localStorage.removeItem("token");
        }
    }
})

export default useUserStore;
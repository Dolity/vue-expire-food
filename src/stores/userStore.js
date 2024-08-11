import { defineStore } from 'pinia';

const useUserStore = defineStore("user", {
    state: () => ({
        userInfo: null,
        isLogin: false,
        token: null
    }),
    actions: {
        loadUserFromLocalStorage(userInfo) {
            const token = localStorage.getItem("token");
            if (token) {
                this.userInfo = userInfo;
                this.token = token;
                this.isLogin = true;
            }
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
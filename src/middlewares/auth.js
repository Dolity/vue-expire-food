import useUserStore from '../stores/userStore.js';

const authGuard = (to, from, next) => {
    const userStore = useUserStore();

    const token = localStorage.getItem('token') || userStore.token;

    if (token) {
        next();
    } else {
        next('/login');
    }

}

export default authGuard;
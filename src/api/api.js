import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c8362d5e-bbd8-4e7a-93d9-284959e18fd5'
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },

    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    }
};

export const profileAPI = {
    getProfileInfo(userId) {
        return (
            instance.get(`profile/${userId}`).then(response => response.data)
        )
    },

    getProfileStatus(userId) {
        return(
            instance.get(`profile/status/${userId}`).then(response => response.data)
        )
    }
};

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`).then(response => response.data)
    }
};

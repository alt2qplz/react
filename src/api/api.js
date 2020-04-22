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
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    }
};

export const profileAPI = {
    getProfileInfo(userId) {
        return (
            instance.get(`profile/${userId}`)
        )
    },

    getProfileStatus(userId) {
        return(
            instance.get(`profile/status/${userId}`)
        )
    },

    updateProfileStatus(status) {
        return instance.put(`profile/status/`, {status: status})
    }
};

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    }
};

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
    },

    updateProfilePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    },

    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },

    logout() {
        return instance.delete('auth/login')
    }
};

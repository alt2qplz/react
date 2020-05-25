import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        //alt2qplz@gmail.com
        //'API-KEY': 'c8362d5e-bbd8-4e7a-93d9-284959e18fd5'
        //dozer.0x00@gmail.com
        'API-KEY': '52ae5b32-ce20-40a3-9c01-767f48795290'
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },

    checkFollow(userId) {
        return instance.get(`follow/${userId}`)
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
        return (
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
    },

    updateProfileInfo(profile) {
        return instance.put(`profile/`, profile)
    },
};

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    },

    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },

    logout() {
        return instance.delete('auth/login')
    }
};

export const securityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
};

export const dialogsAPI = {

    //get all dialogs
    getAllDialogs() {
        return instance.get('dialogs')
    },

    //start chatting, refresh your companion so that he was on top
    startChatting(userId) {
        return instance.put(`dialogs/${userId}`)
    },

    //get list of messages with your friend
    getMessages(userId) {
        return instance.get(`dialogs/${userId}/messages`)
    },

    //send message to your friend
    sendMessageToUser(userId, message) {
        return instance.post(`dialogs/${userId}/messages`, {body: message})
    }
};
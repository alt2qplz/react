import axios from "axios";

export enum ResultCodesEnum {
    // Коды ответа
    Success = 0,
    Error = 1,
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        //alt2qplz@gmail.com
        'API-KEY': 'c8362d5e-bbd8-4e7a-93d9-284959e18fd5'
        //dozer.0x00@gmail.com
        //'API-KEY': '52ae5b32-ce20-40a3-9c01-767f48795290'
    }
});

// Users API (getUsers, checkFollow, follow, unfollow)

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },

    checkFollow(userId: number) {
        return instance.get(`follow/${userId}`)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
};

// Profile API (getProfileInfo, getProfileStatus, updateProfileStatus, updateProfilePhoto, updateProfileInfo)

export const profileAPI = {
    getProfileInfo(userId: number) {
        return (
            instance.get(`profile/${userId}`)
        )
    },

    getProfileStatus(userId: number) {
        return (
            instance.get(`profile/status/${userId}`)
        )
    },

    updateProfileStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    },

    updateProfilePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    updateProfileInfo(profile: any) {
        return instance.put(`profile/`, profile)
    },
};

// Auth API (authMe, login, logout)

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    getAuthMe() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data)
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha}).then(response => response.data)
    },

    logout() {
        return instance.delete<LogoutResponseType>('auth/login').then(response => response.data)
    }
};

// Security API (Captcha)

type CaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url').then(response => response.data)
    }
};

// Dialogs API (getAllDialogs, startChatting, getMessages, sendMessageToUser)

export const dialogsAPI = {

    //get all dialogs
    getAllDialogs() {
        return instance.get('dialogs')
    },

    //start chatting, refresh your companion so that he was on top
    startChatting(userId: number) {
        return instance.put(`dialogs/${userId}`)
    },

    //get list of messages with your friend
    getMessages(userId: number) {
        return instance.get(`dialogs/${userId}/messages`)
    },

    //send message to your friend
    sendMessageToUser(userId: number, message: string) {
        return instance.post(`dialogs/${userId}/messages`, {body: message})
    }
};
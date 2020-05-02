import React from "react";
import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    postsData: [
        {
            id: 1,
            message: 'Искусство бесполезно, потому что его цель – лишь создавать настроение. В его задачу не входит ни ' +
                'поучать, ни как-либо влиять на поступки. Оно великолепно в своей стерильности, и его стерильность ' +
                'неотделима от доставляемого им удовольствия. Если созерцание произведения искусства побуждает к ' +
                'какой-либо деятельности, это значит, что либо произведение весьма посредственно, либо созерцающий ' +
                'не сумел оценить его во всей художественной полноте.',
            likes: 10
        }
    ],
    newPostText: '',
    profile: null,
    profileStatus: ""
};

test('add post', () => {
    //1. test data
    let action = addPost('newPost');

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.postsData.length).toBe(2)
});

test('new post text is correct', () => {
    //1. test data
    let action = addPost('newPost');

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.postsData[1].message).toBe('newPost')
});

test('new post likes count is zero', () => {
    //1. test data
    let action = addPost('newPost');

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.postsData[1].likes).toBe(0)
});

test('delete post', () => {
    //1. test data
    let action = deletePost(1);

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.postsData.length).toBe(0)
});
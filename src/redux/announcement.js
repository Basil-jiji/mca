import * as ActionTypes from "./ActionTypes";

export const Announcements = (state = {
    errMess: null,
    announcements: []
}, action) => {
switch(action.type){
    case ActionTypes.ADD_ANNOUNCEMENT:
        return { ...state, isLoading: false, errMess: null, announcements: action.payload }

    case ActionTypes.ANNOUNCEMENT_LOADING:
        return { ...state, isLoading: false, errMess: action.payload, announcements: [] }

    case ActionTypes.ADD_ANNOUNCEMENTS:
        var announcement = action.payload;
        return {...state, compostsments: state.comments.concat(announcement) };

    default:
        return state;
}
}
import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl';

export const addAnnouncement = (announcements) =>({
    type: ActionTypes.ADD_ANNOUNCEMENT,
    payload: announcements

});

export const postAnnouncement = (title, message) => (dispatch) =>{
    const newAnnouncement = {
        title: title,
        message: message
    }
    newAnnouncement.date = new Date().toISOString();

    return fetch (baseUrl + 'announcements',
    {
        method: 'POST',
        body: JSON.stringify(newAnnouncement),
        headers: {
            'Content-type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText );
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess; 
    }
    )
    .then(response => response.json())
    .then(response => dispatch(addAnnouncement(response)))
    .catch(error => {console.log('Post Announcements', error.message);
        alert('Your Announcement could not be posted\nError:' + error.message); })
}

export const fetchAnnouncements = () => (dispatch) =>{
    dispatch(announcementLoading(true));

    return fetch(baseUrl + 'announcements')
    .then(response => {
        //When an error comes of the server
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText );
            error.response = response;
            throw error;
        }
    },

    //When nothing come out of the server
    error => {
        var errmess = new Error(error.message);
        throw errmess; 
    }
    )
    .then(response => response.json())
    .then(announcements => dispatch(addAnnouncement(announcements)))
    .catch(error => dispatch(announcementFailed(error.message)));
}

export const announcementLoading = () => ({
    type: ActionTypes.ANNOUNCEMENT_LOADING
});

export const announcementFailed = (errmess) => ({
    type: ActionTypes.ANNOUNCEMENT_FAILED,
    payload: errmess
});

export const fetchPosts = () => (dispatch) =>{
    dispatch(postsLoading(true));

    return fetch(baseUrl + 'posts')
    .then(response => {
        //When an error comes of the server
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText );
            error.response = response;
            throw error;
        }
    },

    //When nothing come out of the server
    error => {
        var errmess = new Error(error.message);
        throw errmess; 
    }
    )
    .then(response => response.json())
    .then(posts => dispatch(addPosts(posts)))
    .catch(error => dispatch(postsFailed(error.message)));
}


export const postsLoading = () => ({
    type: ActionTypes.POSTS_LOADING
});

export const postsFailed = (errmess) => ({
    type: ActionTypes.POSTS_FAILED,
    payload: errmess
});

export const addPosts = (posts) => ({
    type: ActionTypes.ADD_POSTS,
    payload: posts
})

export const fetchToppers = () => (dispatch) =>{
    dispatch(toppersLoading(true));

    return fetch(baseUrl + 'toppers')
    .then(response => {
        //When an error comes of the server
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText );
            error.response = response;
            throw error;
        }
    },

    //When nothing come out of the server
    error => {
        var errmess = new Error(error.message);
        throw errmess; 
    }
    )
    .then(response => response.json())
    .then(toppers => dispatch(addToppers(toppers)))
    .catch(error => dispatch(toppersFailed(error.message)));
}


export const toppersLoading = () => ({
    type: ActionTypes.TOPPERS_LOADING
});

export const toppersFailed = (errmess) => ({
    type: ActionTypes.TOPPERS_FAILED,
    payload: errmess
});


export const addToppers = (toppers) => ({
    type: ActionTypes.ADD_TOPPERS,
    payload: toppers
}) 

 

export const fetchPlacements = () => (dispatch) =>{
    dispatch(placementsLoading(true));

    return fetch(baseUrl + 'placements')
    .then(response => {
        //When an error comes of the server
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText );
            error.response = response;
            throw error;
        }
    },

    //When nothing come out of the server
    error => {
        var errmess = new Error(error.message);
        throw errmess; 
    }
    )
    .then(response => response.json())
    .then(placements => dispatch(addPlacements(placements)))
    .catch(error => dispatch(placementsFailed(error.message)));
}


export const placementsLoading = () => ({
    type: ActionTypes.PLACEMENTS_LOADING
});

export const placementsFailed = (errmess) => ({
    type: ActionTypes.PLACEMENTS_FAILED,
    payload: errmess
});

export const addPlacements = (placements) => ({
    type: ActionTypes.ADD_PLACEMENTS,
    payload: placements
}) 


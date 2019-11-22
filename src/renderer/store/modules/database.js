import firebase from 'Firebase'
import config from './config'
import { ipcRenderer } from 'electron'

firebase.initializeApp(config)


const state = {
    user: null,
    input: 0,
    displayState: 0,
}

const mutations = {
    SET_USER: function (state, user) {
        state.user = user;
    },
    SET_INPUT: function (state, input) {
        state.input = input;
    },
    SET_DISPLAYSTATE: function (state, displayState) {
        state.displayState = displayState;
    },
    CLEAR_DATA: function (state) {
        state.user = null;
        state.input = 0;
        state.displayState = 0;
    },
}

const actions = {

    login({ commit, dispatch }, loginDetails) {
        firebase.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.password).then(user => {
            console.log("Logged in")
            /* commit('SET_USER', user); */
        }).catch(error => {
            console.log(error);
        })
    },
    logout() {
        firebase.auth().signOut().then(() => {
            console.log("signed out");
        })
    },
    setUser({ commit }, user) {
        return new Promise(resolve => {
            console.log(user);
            commit('SET_USER', { uid: user.uid, email: user.email });
            resolve(true);
        })
    },
    clearData({ commit }) {
        return new Promise(resolve => {
            commit('CLEAR_DATA');
            resolve(true);
        })
    },
    initialize({ state, commit }) {
        return new Promise(resolve => {
            let roomRef = firebase.database().ref('users/' + state.user.uid + '/room');
            roomRef.on('value', function (snapshot) {
                console.log(snapshot.val());
                commit("SET_INPUT", snapshot.val().input);
                commit("SET_DISPLAYSTATE", snapshot.val().displayState);
                
                ipcRenderer.send("control", {
                    ipAddress: snapshot.val().ipAddress,
                    port: snapshot.val().port,
                    input: snapshot.val().input,
                    displayState: snapshot.val().displayState
                });

                

                resolve(true);
            });
        })
    },
    changeInput({ commit }, input) {
        commit("SET_INPUT", input);
        firebase.database().ref('users/' + state.user.uid + "/room").update({
            input: input,
        }).then((data) => {
            console.log("Input changed");
        });
    },
    changeDisplayState({ commit }, displayState) {
        commit("SET_DISPLAYSTATE", displayState);
        firebase.database().ref('users/' + state.user.uid + "/room").update({
            displayState: displayState,
        }).then((data) => {
            console.log("displayState changed");
        });
    },
}

const getters = {
    getUser(state) {
        return state.user;
    },
    getInput(state) {
        return state.input;
    }
}

export default {
    mutations,
    state,
    actions,
    getters
} 

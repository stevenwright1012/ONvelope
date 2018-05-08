import axios from 'axios';

const initailState = {
    user:{},
    transactions:[],
    envelopes: [],
    payday: {},
    redirect: false
}

const GET_USER_INFO ='GET_USER_INFO';
const GET_ALL_TRANS = 'GET_ALL_TRANS';
const GET_ALL_ENVELOPES = 'GET_ALL_ENVELOPES';
const DELETE_TRANS = 'DELETE_TRANS';
const ADD_TRAN = "ADD_TRAN";
const MOVE = "MOVE";
const CHANGE_PLAN = 'CHANGE_PLAN';
const REDIRECT_FALSE = 'REDIRECT_FALSE';
const EDIT_TRANS = 'EDIT_TRANS';

export default function reducer(state = initailState, action){
     
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload, payday: action.payload.payday})
        case GET_ALL_TRANS + '_FULFILLED':
            return Object.assign({}, state, {transactions: action.payload})
        case GET_ALL_ENVELOPES + '_FULFILLED':
            return Object.assign({}, state, {envelopes: action.payload})
        case DELETE_TRANS + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload[1][0], transactions: action.payload[0], envelopes: action.payload[2]})
        case ADD_TRAN + "_FULFILLED":
            return Object.assign({}, state, {user: action.payload[1][0], transactions: action.payload[0], envelopes: action.payload[2], redirect: true})
        case MOVE + "_FULFILLED":
            return Object.assign({}, state, {envelopes: action.payload});
        case CHANGE_PLAN + "_FULFILLED":
            return Object.assign({}, state, {payday: action.payload.payday, redirect: true});
        case REDIRECT_FALSE:
            return Object.assign({}, state, {redirect: false});
        case EDIT_TRANS:
            return Object.assign({}, state, {user: action.payload[1][0], transactions: action.payload[0], envelopes: action.payload[2]})
        default:
            return state;
    }
}

export function getUser(){
    let userData = axios.get('/auth/me').then( res => {
        return res.data
    })
    return{
        type: GET_USER_INFO,
        payload: userData
    }
}

export function getTransactions(id){
    let trans = axios.get(`/api/trans/${id}`).then(res => {
        // console.log(res.data);
        return res.data
    })
    return{
        type: GET_ALL_TRANS,
        payload: trans
    }

}

export function getEnvelopes(id){
    let envelopes = axios.get(`/api/envelopes/${id}`).then(res => {      
        return res.data
    })
    return{
        type: GET_ALL_ENVELOPES,
        payload: envelopes
    }
}

export function addTrans(payee, amount, envelope, status, note){
    let values = axios.post('/api/addtrans', {
        payee: payee,
        amount: (amount * -1),
        envelope: envelope,
        status: status,
        note: note,
    }).then(res => {
        return res.data
    })
    return{
        type: ADD_TRAN,
        payload: values
    }
}
export function deleteTrans(id, amount, envelope, status){
    let values = axios.put('/api/delete', {
        id: id,
        amount: (amount * -1),
        envelope: envelope,
        status: status
    }).then(res => {
        return res.data
    })
    return{
        type: DELETE_TRANS,
        payload: values
    }
}
export function move(envelopes){
    return{
        type: MOVE,
        payload: envelopes
    }
}
export function changePlan(plan){
    let payday = axios.put('/api/plan', plan).then( res => {
        return res.data  
    })
    console.log(payday);
    
    return {
        type: CHANGE_PLAN,
        payload: payday
    }
}
export function redirectFalse(){
    return {
        type: REDIRECT_FALSE,
        payload: false
    }
}
export function editTrans(obj){
    console.log(obj);
    
    return{
        type: EDIT_TRANS,
        payload: obj
    }
}
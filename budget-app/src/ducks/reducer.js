import axios from 'axios';

const initailState = {
    user:{},
    transactions:[],
    envelopes: []
}

const GET_USER_INFO ='GET_USER_INFO';
const GET_ALL_TRANS = 'GET_ALL_TRANS';
const GET_ALL_ENVELOPES = 'GET_ALL_ENVELOPES';
const DELETE_TRANS = 'DELETE_TRANS';
const ADD_TRAN = "ADD_TRAN"

export default function reducer(state = initailState, action){
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case GET_ALL_TRANS + '_FULFILLED':
            return Object.assign({}, state, {transactions: action.payload})
        case GET_ALL_ENVELOPES + '_FULFILLED':
            return Object.assign({}, state, {envelopes: action.payload})
        case DELETE_TRANS + '_FULFILLED':
        console.log(action.payload);
        
            return Object.assign({}, state, {transactions: action.payload})
        case ADD_TRAN + "_FULFILLED":
            return Object.assign({}, state, {transactions: action.payload})            
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

export function addTrans(user_id, payee, amount, envelope, status, note){
    let trans = axios.post('/api/addtrans', {
        user_id: user_id,
        payee: payee,
        amount: (amount * -1),
        envelope: envelope,
        status: status,
        note: note
    }).then(res => {
        return res.data
    })
    return{
        type: ADD_TRAN,
        payload: trans
    }
}
export function deleteTrans(id){
    let trans = axios.delete(`/api/trans/${id}`).then(res => {
        return res.data
    })
    return{
        type: DELETE_TRANS,
        payload: trans
    }
}
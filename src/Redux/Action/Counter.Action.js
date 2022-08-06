import * as ActionTypes from'../ActionTypes'

export const incrementaction = () => (dispatch) => {
    dispatch ({type: ActionTypes.INCREMENT_COUNTER})
}
export const decrementaction = () => (dispatch) => {
    dispatch ({type: ActionTypes.DECREMENT_COUNTER})
}
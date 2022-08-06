import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './Reducer'

export const configurestore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}


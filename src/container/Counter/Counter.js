import React from 'react';
import { decrementaction, incrementaction } from '../Redux/Action/Counter.Action';
import { useDispatch , useSelector } from 'react-redux';

function Counter(props) {
    const co = useSelector(state => state.counter);
    const Dispatch = useDispatch();

    const handleIncrement=() =>{
        Dispatch(incrementaction())
    }
    const handleDecrement=() =>{
        Dispatch(decrementaction())
    }

    return (
        <div>
            <button onClick={() => handleIncrement()}>+</button>
            <p>{co.count}</p>
            <button onClick={() => handleDecrement()}>-</button>
        </div>
    );
}

export default Counter;
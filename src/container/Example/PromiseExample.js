import React, { useEffect } from 'react';

function PromiseExample(props) {

    const one = () => {
        return "one";
    }

    const two = () => {
        //with promise
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve ("two");
            }, 2000);
        })
    }

    const three = () => {
        return "three";
    }

    const All = async () => {
        const oneAns = one();
        console.log(oneAns);

        const twoAns = await two();
        console.log(twoAns);

        const threeAns = three();
        console.log(threeAns);
    }

    const print = (z) => {
        console.log(z);
    }

    const sum = (a, b, callback) => {
        let sum = 0;
        sum = a + b;
        callback(sum)
    }

    sum (10, 20, print)

    useEffect(() => {
        All();
    },[])

    return (
        <div>
            
        </div>
    );
}

export default PromiseExample;
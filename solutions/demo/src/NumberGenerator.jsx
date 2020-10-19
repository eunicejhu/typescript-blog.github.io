import React from 'react'

const getNumColor = (num) => {
    if(num === 1) { // 1 is not a prime
        return "yellow"
    }
    if(num === 2) { // 2 is a prime
        return "red"
    }
     if(num % 2 === 0) { // even
        return "green"
    } else { // odd
        let isPrime = true
        for(let i = 1; i<= num; i++) {
            if(i!== 1 && i!== num && num%i === 0) {
                isPrime = false
            }
        }
        return isPrime? "red": "yellow"
    }
}
const Squares =({num}) => new Array(num).fill(0).map((value, index) => <li style={{backgroundColor: getNumColor(index), color: "white"}} key={index}>{index}</li>);

export const NumberGenerator = ({num}) =><div className="number_generator_wrapper">
    <h2>Number Generator</h2>
    <ul className="squares_wrapper">
        <Squares num={num} />
    </ul>
</div> 
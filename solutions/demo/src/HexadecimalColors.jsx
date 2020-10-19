import React from 'react'

const hexaColorGenerator = () => {
    const str = '0123456789abcdef';
    let color = ''
    for(let i=0; i<6; i++) {
        color += str[Math.floor(Math.random()*str.length)];
    }
    return '#'.concat(color)
}

const Colors = ({num}) => new Array(num).fill(0).map(() =>{
    let color = hexaColorGenerator();
    return <li key={color} style={{backgroundColor: color, color: "silver"}}>{color}</li>
})



export const HexadecimalColors = ({num}) =><div className="hexadecimalColors_generator_wrapper">
    <h2>Hexadecimal Colors</h2>
    <ul className="squares_wrapper">
        <Colors num={num} />
    </ul>
</div> 
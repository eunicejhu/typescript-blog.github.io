import React from 'react'

const hexaColorGenerator = () => {
    const str = '0123456789abcdef';
    let color = ''
    for(let i=0; i<6; i++) {
        color += str[Math.floor(Math.random()*str.length)];
    }
    return '#'.concat(color)
}
const colorStrips = num => new Array(num).fill(0).map(() =>{
        let color = hexaColorGenerator();
        return <li key={color} style={{backgroundColor: color}}>{color}</li>
})

export const ColorGenerator = () => 
    <ul className="colors-wrapper">
        {colorStrips(6)}
    </ul>

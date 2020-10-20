import React from 'react'

import './BackgroundChanger.css'
const SEASONS = ["spring", "summer", "autumn", "winter"]
const BGCOLORS = ["green", "red", "yellow", "silver"]

class BackgroundChanger extends React.Component {
    state = {
        index: 0
    }
    changeSeason = () => {
        const index = Math.floor(Math.random() * SEASONS.length)
        this.setState({index: index })
    }
    render () {
        const {index} = this.state
        return (<div className="backgroundchanger_wrapper" style={{backgroundColor: BGCOLORS[index]}}>
            <div>
                <h1>{SEASONS[index]}</h1>
                <button onClick={this.changeSeason}>Change Season</button>
            </div>
            
        </div>)
    }
}

export default BackgroundChanger
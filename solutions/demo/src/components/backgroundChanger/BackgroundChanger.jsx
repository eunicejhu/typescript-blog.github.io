import React from 'react'

import "../../styles/BackgroundChanger.css"

// const SEASONS = ["spring", "summer", "autumn", "winter"]
const BGCOLORS = ["green", "red", "yellow", "silver", "gray"]
const PERIODS = ["morning", "noon", "afternoon", "evening", "night"]

const getRandomHour = () => Math.floor(Math.random() * 24)
const getPeriodFromHour = hour => {
    if(hour >=6 && hour < 12) {
        return 0
    } else if (hour == 12) {
        return 1
    } else if (hour >= 13 && hour<17) {
        return 2
    } else if(hour >= 17 && hour<20) {
        return 3
    } else {
        return 4
    }
}

class BackgroundChanger extends React.Component {
    state = {
        index: 0
    }
    // changeSeason = () => {
    //     const index = Math.floor(Math.random() * SEASONS.length)
    //     this.setState({index: index })
    // }
    changeHour = () => {
        const hour = getRandomHour()
        const periodIndex = getPeriodFromHour(hour)
        this.setState({index: periodIndex})
    }
    render () {
        const {index} = this.state
        return (<div className="backgroundchanger_wrapper" style={{backgroundColor: BGCOLORS[index]}}>
            <div>
                <h1>{PERIODS[index]}</h1>
                <button onClick={this.changeHour}>Get Random time</button>
            </div>
            
        </div>)
    }
}

export default BackgroundChanger
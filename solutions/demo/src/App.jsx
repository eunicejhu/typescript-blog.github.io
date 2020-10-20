import React from 'react'

// import {Image} from './Image'
// import {Subscribe} from "./Subscribe"
// import {UserCard} from './UserCard'
// import ColorGenerator from './ColorGenerator'
// import {NumberGenerator} from './NumberGenerator'
// import {HexadecimalColors} from './HexadecimalColors'
// import {WorldPopulation} from './WorldPopulation'
import CountrySelector from './CountrySelector'
import BackgroundChanger from './BackgroundChanger'

class App extends React.Component {
    state = {
        isDarkMode: false
    }

    toggleDarkMode = () => {
        this.setState({isDarkMode: !this.state.isDarkMode})
    }

    render() {
        const darkModeStyle = {
            position: "fixed",
            bottom: 0,
            right: 10,
            color: "white",
            padding: "1em",
            backgroundColor: "grey",
            border: 0,
            borderRadius: '4px 4px 0 0',
            outline: "none",
            cursor: "pointer"
        }
        return <div style={{backgroundColor: this.state.isDarkMode ? "rgba(0,0,0,0.8)": "white"}}> 
            {/* <WorldPopulation />
            <NumberGenerator num={32} />
            <h3 style={{textAlign: "center"}}>Front end technology</h3>
            <Image />
            <Subscribe />
            <ColorGenerator />
            <HexadecimalColors num={32} />
            <UserCard /> */}
            {/* <CountrySelector /> */}
            <BackgroundChanger />
            {/* <button style={darkModeStyle} onClick={this.toggleDarkMode}>Toggle Dark Mode</button> */}
        </div>
    }
}

export default App;
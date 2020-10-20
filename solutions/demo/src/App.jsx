import React from 'react'

const Button = ({text, onClick, style}) => <button style={style} onClick={onClick} >{text}</button>
class App extends React.Component {
    state = {
        isLoading: false
    }
    fetchData = () => {
        this.setState({isLoading: true})
        setTimeout(() => {this.setState({isLoading: false})}, 1000)
    }
    render() {
        const buttonStyle = {
            backgroundColor: "cyan",
            border: 0,
            padding: "1em",
            outline: "none"
        }
        return <div> 
            <Button text={this.state.isLoading ? "Loading": "Fetch Data"} onClick={this.fetchData} style={buttonStyle} />
        </div>
    }
}

export default App;
import React from 'react'

import Avatar from './images/zuoqinhu.jpg'
const SKILLS = ["HTML", "CSS", "Sass", "JS", "React", "Redux", "Node", "MongoDB", "Webpack", "Git", "Typescript", "D3.js", "Design System", "TDD", "SCRUM", "Jest", "MYSQL"]
const formatedSkills = SKILLS.map(skill => <li key={skill}>{skill}</li>)

class UserCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="usercard_wrapper">
        <img src={Avatar} alt="isabella"></img>
        <h3>ZUOQIN HU (Isabella)</h3>
        <p>Senior Frontend Developer, Paris</p>
        <ul>
            {formatedSkills}
        </ul>
        <p>joined on August 30, 2020</p>
    </div>
    }
}
export  {UserCard} 
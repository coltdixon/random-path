import logo from './logo.svg';
import './App.css';
import React from 'react';
import classes from './data/classes.json'
import backgrounds from './data/backgrounds.json'
import ancestries from './data/ancestries.json'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      charClass: null,
      background: null,
      ancestry: null,
      lastClassIndex: null,
      lastBGIndex: null,
      lastAncesIndex: null,
    }
  }

  handleGenerateCharacter() {
    const randomClassIndex = this.randomIndex(classes.length, "classes")
    const randomBGIndex = this.randomIndex(backgrounds.length, "backgrounds")
    const randomAncesIndex = this.randomIndex(ancestries.length, "ancestries")
    this.setState({charClass: classes[randomClassIndex], background: backgrounds[randomBGIndex], ancestry: ancestries[randomAncesIndex]})
  }

  randomIndex(length, type) {
    let i;
    switch (type) {
      case "classes":
        i = Math.floor(Math.random() * length)
        i = i == this.state.lastClassIndex ? this.randomIndex(length, type) : i
        this.setState({lastClassIndex: i})
        break
      case "backgrounds":
        i = Math.floor(Math.random() * length)
        i = i == this.state.lastBGIndex ? this.randomIndex(length, type) : i
        this.setState({lastBGIndex: i})
        break
      case "ancestries":
        i = Math.floor(Math.random() * length)
        i = i == this.state.lastAncesIndex ? this.randomIndex(length, type) : i
        this.setState({lastAncesIndex: i})
        break
    }
    return i
  }

  render() {
    return (
      <div className="App">
        <h1>Quick &amp; Dirty Pathfinder 2E Random Generator</h1>
        <button onClick={() => {this.handleGenerateCharacter()}}>Generate Character</button>

        <div className="character">
          <div id="ancestry-info" className="info">
            <strong>Ancestry:</strong> {this.state.ancestry}
          </div>
          <div id="background-info" className="info">
            <strong>Background:</strong> {this.state.background}
          </div>
          <div id="class-info" className="info">
            <strong>Class:</strong> {this.state.charClass}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

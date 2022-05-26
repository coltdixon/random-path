import './App.css';
import React from 'react';
import classes from './data/classes.json'
import backgrounds from './data/backgrounds.json'
import ancestries from './data/ancestries.json'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      classList: [],
      bgList: [],
      ancestList: [],
      charClass: null,
      background: null,
      ancestry: null,
      lastClassIndex: null,
      lastBGIndex: null,
      lastAncesIndex: null,
    }
  }
  
  componentDidMount() {
    this.setState({classList: classes, bgList: backgrounds, ancestList: ancestries})
  }

  handleGenerateCharacter() {
    const randomClassIndex = this.randomIndex(this.state.classList.length, "classes")
    const randomBGIndex = this.randomIndex(this.state.bgList.length, "backgrounds")
    const randomAncesIndex = this.randomIndex(this.state.ancestList.length, "ancestries")
    this.setState({charClass: classes[randomClassIndex], background: backgrounds[randomBGIndex], ancestry: this.state.ancestList[randomAncesIndex]})
  }

  handleRarity(e, type) {
    if (e.target.checked) {
      const newAncestList = this.state.ancestList.filter(ancestry => ancestry.rarity !== type)
      this.setState({ancestList: newAncestList})
    } else {
      this.setState({ancestList: ancestries})
    }
  }

  randomIndex(length, type) {
    let i;
    switch (type) {
      case "classes":
        i = Math.floor(Math.random() * length)
        i = i === this.state.lastClassIndex ? this.randomIndex(length, type) : i
        this.setState({lastClassIndex: i})
        break
      case "backgrounds":
        i = Math.floor(Math.random() * length)
        i = i === this.state.lastBGIndex ? this.randomIndex(length, type) : i
        this.setState({lastBGIndex: i})
        break
      case "ancestries":
        i = Math.floor(Math.random() * length)
        i = i === this.state.lastAncesIndex ? this.randomIndex(length, type) : i
        this.setState({lastAncesIndex: i})
        break
    }
    return i
  }

  render() {
    return (
      <div className="container">
        <h1>Quick &amp; Dirty Pathfinder 2E Random Generator</h1>
        <div className="form-box">
          <input onChange={(e) => {this.handleRarity(e, "uncommon")}} id="uncommon" type="checkbox"/><label htmlFor="uncommon">Exclude Uncommon Ancestries</label><br />
          <input onChange={(e) => {this.handleRarity(e, "rare")}} id="rare" type="checkbox"/><label htmlFor="rare">Exclude Rare Ancestries</label><br />
          <button onClick={() => {this.handleGenerateCharacter()}}>Generate Character!</button>
        </div>

        <div className="character">
          <div id="ancestry-info" className="info">
            <strong>Ancestry:</strong> {this.state.ancestry?.name}
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

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cumulativeScores: [],
      totalScore: 0,
      frameScores: [],
      frame: 1,
      turnSwitch: true,
      thirdTurn: false,
      frameArray: []
    }

    this.renderScores = this.renderScores.bind(this);
    this.addBowl = this.addBowl.bind(this);
    this.resetBuilder = this.resetBuilder.bind(this);
    this.tenthFrameDecider = this.tenthFrameDecider.bind(this);
    this.frameScoresAdder = this.frameScoresAdder.bind(this);
    this.totalScoreAdder = this.totalScoreAdder.bind(this);
  }

  renderScores() {
    console.log('hello')
  }

  get initialState() {
    return {
      cumulativeScores: [],
      totalScore: 0,
      frameScores: [],
      frame: 1,
      turnSwitch: true,
      thirdTurn: false,
      frameArray: []
    };
  }

  resetBuilder() {
    this.setState(this.initialState);
  }

  tenthFrameDecider() {
    console.log('in tenth')
    console.log(this.state.frameScores[19])
    const add = this.state.frameScores[19] + this.state.frameScores[20];
    if (this.state.frameScores[19] || add === 10) {
      this.setState(prevState => ({
        thirdTurn: !prevState.thirdTurn
      }));
    }
  }

  frameScoresAdder(value) {
    let results = value
    for (var i = 0; i < this.state.frameScores.length; i++) {
      results += this.state.frameScores[i];
    }
    this.setState(prevState => ({
      cumulativeScores: [...prevState.cumulativeScores, results],
    }));
    // this.totalScoreAdder();
    return results;
  }

  totalScoreAdder(array) {
    let results = 0;
    // console.log(this.state.cumulativeScores)
    // for (var i = 0; i < this.state.cumulativeScores.length; i++) {
    //   results += this.state.cumulativeScores[i];
    //   if (i === this.state.cumulativeScores.length) {
    //     this.setState({
    //       totalScore: results
    //     })
    //   }
    // }
    for (let i = 0; i < array.length; i++) {
      results += array[i];
    }
    return results;
  }

  addBowl(e) {
    let value = Number(e.target.id);
    if (this.state.frame != 10) {
      if (this.state.turnSwitch) {
        let newArray = [...this.state.frameScores, value]
        // this.setState(prevState => ({
        //   frameScores: [...prevState.frameScores, value],
        //   turnSwitch: !prevState.turnSwitch
        // }));
        this.setState({
          frameScores: newArray,
          turnSwitch: !this.state.turnSwitch
        })
      } else {
        const result = this.frameScoresAdder(value);
        let newArray = [...this.state.frameScores, value]
        let nextFrame = this.state.frame + 1
        // this.setState(prevState => ({
        //   frameScores: [...prevState.frameScores, value],
        //   turnSwitch: !prevState.turnSwitch,
        //   frame: prevState + 1
        // }));
        this.setState({
          frameScores: newArray,
          turnSwitch: !this.state.turnSwitch,
          totalScore: this.totalScoreAdder(newArray),
          frame: nextFrame          
        })
        // this.totalScoreAdder()
      }
    } else {
      // this.resetBuilder();
      if (value === 10) {
        console.log('sucess')
        if (this.state.turnSwitch) {
          let newArray = [...this.state.frameScores, value]
          this.setState({
            frameScores: newArray,
            turnSwitch: !this.state.turnSwitch
          })
        } else {
          this.tenthFrameDecider();
          const result = this.frameScoresAdder(value);
          let newArray = [...this.state.frameScores, value]
          let nextFrame = this.state.frame + 1
          this.setState({
            frameScores: newArray,
            turnSwitch: !this.state.turnSwitch,
            totalScore: this.totalScoreAdder(newArray),
            frame: nextFrame          
          })
        }
      } else {
        if (this.state.turnSwitch) {
          let newArray = [...this.state.frameScores, value]
          this.setState({
            frameScores: newArray,
            turnSwitch: !this.state.turnSwitch
          })
        } else {
          this.tenthFrameDecider();
          const result = this.frameScoresAdder(value);
          let newArray = [...this.state.frameScores, value]
          let nextFrame = this.state.frame + 1
          this.setState({
            frameScores: newArray,
            turnSwitch: !this.state.turnSwitch,
            totalScore: this.totalScoreAdder(newArray),
            frame: nextFrame          
          })
        }

      }
    }

  }


  render () {
    return (
      <div>
      <h1>Let's Bowl!</h1>

      <div>
      <div><button id='1' onClick={this.addBowl}>1</button><button id='2' onClick={this.addBowl}>2</button><button id='3' onClick={this.addBowl}>3</button></div>
      <div><button id='4' onClick={this.addBowl}>4</button><button id='5' onClick={this.addBowl}>5</button><button id='6' onClick={this.addBowl}>6</button></div>
      <div><button id='7' onClick={this.addBowl}>7</button><button id='8' onClick={this.addBowl}>8</button><button id='9' onClick={this.addBowl}>9</button></div>
      <div><button id='10' onClick={this.addBowl}>10</button><button id='0' onClick={this.addBowl}>0</button></div>
      </div>

      <div></div>
      <div><button>Reset</button></div>

      <div className='Container'>
      <table id='table' className='Scorecard' cellPadding='1' cellSpacing='0'>
        <tbody>
          <tr>
            <th id='c1' colSpan='6'>Frame 1</th>
            <th id='c2' colSpan='6'>Frame 2</th>
            <th id='c3' colSpan='6'>Frame 3</th>
            <th id='c4' colSpan='6'>Frame 4</th>
            <th id='c5' colSpan='6'>Frame 5</th>
            <th id='c6' colSpan='6'>Frame 6</th>
            <th id='c7' colSpan='6'>Frame 7</th>
            <th id='c8' colSpan='6'>Frame 8</th>
            <th id='c9' colSpan='6'>Frame 9</th>
            <th id='c10' colSpan='6'>Frame 10</th>
            <th id='c11' colSpan='6'>Total Score</th>
          </tr>
          <tr>
          {/* {this.renderScores(0,0)}{this.renderScores(0,1)} */}
          
            <td id='r1' colSpan='3'>Roll 1: {this.state.frameScores[0]}</td><td id='r2' colSpan='3'>Roll 2: {this.state.frameScores[1]}</td>
            <td id='r3' colSpan='3'>Roll 1: {this.state.frameScores[2]}</td><td id='r4' colSpan='3'>Roll 2: {this.state.frameScores[3]}</td>
            <td id='r5' colSpan='3'>Roll 1: {this.state.frameScores[4]}</td><td id='r6' colSpan='3'>Roll 2: {this.state.frameScores[5]}</td>
            <td id='r7' colSpan='3'>Roll 1: {this.state.frameScores[6]}</td><td id='r8' colSpan='3'>Roll 2: {this.state.frameScores[7]}</td>
            <td id='r9' colSpan='3'>Roll 1: {this.state.frameScores[8]}</td><td id='r10' colSpan='3'>Roll 2: {this.state.frameScores[9]}</td>
            <td id='r11' colSpan='3'>Roll 1: {this.state.frameScores[10]}</td><td id='r12' colSpan='3'>Roll 2: {this.state.frameScores[11]}</td>
            <td id='r13' colSpan='3'>Roll 1: {this.state.frameScores[12]}</td><td id='r14' colSpan='3'>Roll 2: {this.state.frameScores[13]}</td>
            <td id='r15' colSpan='3'>Roll 1: {this.state.frameScores[14]}</td><td id='r16' colSpan='3'>Roll 2: {this.state.frameScores[15]}</td>
            <td id='r17' colSpan='3'>Roll 1: {this.state.frameScores[16]}</td><td id='r18' colSpan='3'>Roll 2: {this.state.frameScores[17]}</td>
            <td id='r19' colSpan='2'>Roll 1: {this.state.frameScores[18]}</td><td id='r20' colSpan='2'>Roll 2: {this.state.frameScores[19]}</td>{this.state.thirdTurn === true && <td id='r21' colSpan='2'>Roll 3: {this.state.frameScores[20]}</td>}
            <td id='total-score' className='Total' colSpan='6'>{this.state.totalScore}</td>
          </tr>
          <tr>
            <td id='cumulative-score-f1' colSpan='6'>{this.state.cumulativeScores[0]}</td>
            <td id='cumulative-score-f2' colSpan='6'>{this.state.cumulativeScores[1]}</td>
            <td id='cumulative-score-f3' colSpan='6'>{this.state.cumulativeScores[2]}</td>
            <td id='cumulative-score-f4' colSpan='6'>{this.state.cumulativeScores[3]}</td>
            <td id='cumulative-score-f5' colSpan='6'>{this.state.cumulativeScores[4]}</td>
            <td id='cumulative-score-f6' colSpan='6'>{this.state.cumulativeScores[5]}</td>
            <td id='cumulative-score-f7' colSpan='6'>{this.state.cumulativeScores[6]}</td>
            <td id='cumulative-score-f8' colSpan='6'>{this.state.cumulativeScores[7]}</td>
            <td id='cumulative-score-f9' colSpan='6'>{this.state.cumulativeScores[8]}</td>
            <td id='cumulative-score-f10' colSpan='6'>{this.state.cumulativeScores[9]}</td>
            <td id='total-score' colSpan='6'></td>
          </tr>
        </tbody>
      </table>
    </div>

      {/* {this.state.points.cumulativeScores > 0 &&
      <div>
      <h2>Score!</h2>
      </div>
      } */}

      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
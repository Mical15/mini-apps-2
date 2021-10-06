import React from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate';
import Results from './components/results.jsx';
const axios = require('axios'); 

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            events: []
        }
        this.findResults = this.findResults.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

    findResults(e) {
        e.preventDefault();
        axios.get('http://localhost:3000/events?q=' + this.state.query, {
        })
        .then((results) => {
            this.setState({
                events: results.data,
                pageCount: Math.ceil(results.data.length / this.state.perPage),
            })
        })          
    }

    handleChange(e) {
        this.setState({
            query: e.target.value.toString()
        })
    }
    
    render() {
        return (
        <div>
          <h1>Historical Event Browser!</h1>
          <form>
            <input onChange={this.handleChange}/>
            <button onClick={this.findResults}>Search</button>
          </form>

            {this.state.events.length > 0 &&
            <Results events={this.state.events} pageCount={this.state.pageCount}/>
            }
        </div>
        )
      }
}

ReactDOM.render(<App />, document.getElementById('app'));
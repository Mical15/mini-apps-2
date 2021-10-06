import React from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.events,
      offset: 0,
      perPage: 10,
      currentPage: 0,
      pageCount: props.pageCount
    };
  }


  render() {
    <div className="feed">
      <h2>Results:</h2>
      <ul>
        {
          this.state.events.map((item, index) => {
            return (
              <li key={index}>
                <div>{item.date}</div>
                <div>{item.description}</div>
                <div>{item.lang}</div>
                <div>{item.category2}</div>
              </li>
            );
          })
        }
      </ul>
    </div>
  }




}

export default Results;



// const Results = (props) => (
    // <div className="feed">
    //     <h2>Results:</h2>
    //   <ul>
    //     {
    //       props.events.map((item, index) => {
    //         return (
    //           <li key={index}>
    //             <div>{item.date}</div>
    //             <div>{item.description}</div>
    //             <div>{item.lang}</div>
    //             <div>{item.category2}</div>
    //           </li>
    //         );
    //       })
    //     }
    //   </ul>
    // </div>

// );

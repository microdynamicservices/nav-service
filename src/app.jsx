import React from 'react';
import ReactDOM from 'react-dom';
import StaticNav from './components/StaticNav.jsx';
import Thumbnail from './components/Thumbnail.jsx';
import Axios from 'axios';
import Router from 'react-router-dom'; //used to route to different compononents without refresh -- stretch add

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      adventures: [],
      showList: false,
      showEntry: false,
    }
  }

  // Add this method as a prop to <StaticNav /> if you want to reseed the database
  // populate(records) {
  //   Axios.post('/populate', records)
  //   .then(() => console.log('Successfully populated database'))
  //   .catch(() => console.log('Failed to populated database'));
  // }

  selectAdventure(target, category) {
    const clickEvent = new CustomEvent('changeID', { detail: [target, category] });
    window.dispatchEvent(clickEvent);
  }

  componentDidMount() {
    Axios.get('http://ec2-18-223-184-74.us-east-2.compute.amazonaws.com/headers')
      .then((res) => this.setState({ categories: res.data }) )
      .catch((err) => console.log(err));

    Axios.get('http://ec2-18-223-184-74.us-east-2.compute.amazonaws.com/adventures')
      .then((res) => this.setState({ adventures: res.data }) )
      .catch((err) => console.log(err));

  }

  render(){
    // Completely eliminates default HTML border:
    document.body.style.margin = "0";

    return(
      <div>
        <StaticNav 
            {...this.state}
            // populate={this.populate}
            selectAdventure={this.selectAdventure.bind(this)}
        />
        {/* <Thumbnail adventures={this.state.adventures} /> */}
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('nav'))
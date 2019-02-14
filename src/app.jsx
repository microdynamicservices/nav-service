import React from 'react';
import ReactDOM from 'react-dom';
import StaticNav from './components/StaticNav.jsx';
import Axios from 'axios';
import Router from 'react-router-dom'; //used to route to different compononents without refresh -- stretch add

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: ['AIR', 'EARTH', 'FIRE', 'WATER', 'BLOOD', 'ANIMA'],
      biomes: ['plains', 'swamp', 'forest', 'jungle', 'ocean', 'volcano', 'atmosphere', 'space'],
      adventures: [],
      showList: false,
      showEntry: false
    }
  }
  populate(records) {
    Axios.post('/populate')
    .then(() => console.log('Successfully populated database'))
    .catch(() => console.log('Failed to populated database'));
    //add this method as a prop to <StaticNav /> if you want to reseed the database
  }
  toggleList() {
    this.state.showList ? this.setState({showList: false}) : this.setState({showList: true})
  }
  render(){
    document.body.style.margin = "0";
    const pageStyle = {
      overflow: "hidden",
      margin: 0,
    };

    return(
      <div style={pageStyle}>
        <StaticNav 
          adventures={this.state.adventures} 
          elements={this.state.elements} 
          biomes={this.state.biomes}
          showList={this.state.showList}
          showEntry={this.state.showEntry} 
          toggleList={this.toggleList.bind(this)}
        />
        I am a React App. Have fun!
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
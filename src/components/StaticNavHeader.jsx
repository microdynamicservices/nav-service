import React from 'react';
import StaticNavList from './StaticNavList.jsx'

const flexStyle = {
  flexGrow : "1"
}

const buttStyle = {
  flexGrow: "1",
  color: "white",
  fontFamily: `"BlinkMacSystemFont", "Roboto", "Droid Sans", "Segoe UI", "Helvetica", Arial, sans-serif`,
  fontSize: "22px",
  cursor: "pointer",
  // transition: `color 195ms ease-in 0s`,
  transitionProperty: `color`,
  transitionDuration: `150ms`,
  transitionTiming: `ease-in`,
  transitionDelay: 0
}

const transStyle = {...buttStyle};
transStyle.color = "#d9b310";

class StaticNavHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderDD: false,
      style: buttStyle,
      adventures: []
    }
  }

  // This function takes the adventures passed in from the Axios call
  // in the App component and arranges them by category.
  categorizeAdventures() {
    const categorizedAdventures = [];
    this.props.adventures.forEach((adventure) => {
      if (adventure.catagory === this.props.category) { //sic
        categorizedAdventures.push(adventure);
      }
    })
    this.setState({adventures: categorizedAdventures})
  };
  // This function is SUPPOSED TO reduce opacity of the DD menu over
  // time and then stop rendering them once the opacity reaches 0.
  fadeListOut() {
    this.setState({ renderDD: false })
  };

  unGlow() {
    this.setState({ style: buttStyle })
  }

  componentDidMount() {
    // This invocation is delayed to give the asynchronous call to the
    // database a chance to complete before running itself.
    setTimeout(this.categorizeAdventures.bind(this), 250)
  };

  componentDidUpdate(prevProps) {
    if (this.props.renderFlip !== prevProps.renderFlip) {
      this.setState({renderDD: false});
      this.setState({style: buttStyle});
    }
  }

  render() {
    return(
      <div style={flexStyle}>
        <a style={this.state.style}
          onMouseEnter={() => {
            this.props.unRender()
            setTimeout(() => this.setState({renderDD: true, style: transStyle}), 0)
          }}
        >
        {this.props.category.toUpperCase()}
        </a>
        <div>
          { this.state.renderDD 
          ? <StaticNavList
            unGlow={this.unGlow.bind(this)}
            unRender={this.props.unRender}
            fadeListOut={this.fadeListOut.bind(this)}
            adventures={this.state.adventures} 
            selectAdventure={this.props.selectAdventure} />  
          : null }
        </div>
      </div>
    ) 
  }
}
export default StaticNavHeader;
import React from 'react';
import StaticNavList from './StaticNavList.jsx'

// Style choices below
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
  transitionDuration: `200ms`,
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
      style: buttStyle
    }
  }
  render() {
    return(
      <div style={flexStyle}>
        <a style={this.state.style}
        onMouseEnter={() => this.setState({renderDD: !this.state.renderDD, style: transStyle})}
        onMouseLeave={() => this.setState({style: buttStyle})}
        >
          {this.props.element}
        </a>
        <div>{this.state.renderDD ? <StaticNavList biomes={this.props.biomes} />  : null}</div>
      </div>
    ) 
  }
}
export default StaticNavHeader;
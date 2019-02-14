import React from 'react';
import StaticListEntry from './StaticNavEntry.jsx'

const StaticNavList = (props) => {
  const listStyle = {
    position: "fixed",
    backgroundColor: "#242121",
    listStyle: "none",
    // opacity: 0.95
  }
  return (
    <ul style={listStyle}>
      {props.biomes.map((biome, index) => <StaticListEntry key={index} biome={biome}/>)}
    </ul>
  )
}

export default StaticNavList;
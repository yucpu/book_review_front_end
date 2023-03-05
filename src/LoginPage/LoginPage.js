import React, { useState } from 'react';
import {ForceGraph3D} from 'react-force-graph';
import SpriteText from 'three-spritetext';

function LoginPage() {

  let links = [{source:"1", target:"2"},{source:"2", target:"3"},{source:"4", target:"1"},{source:"4", target:"2"}]
  let data = { nodes: [{id:"1"},{id:"2"},{id:"3"},{id:"4"}], links: links }
  return (
    <ForceGraph3D graphData={data} 
    nodeThreeObject={node=> {const sprite = new SpriteText(node.id); sprite.color = "red"; return sprite}} 
    nodeThreeObjectExtend={false}
    />
  )
}

export default LoginPage
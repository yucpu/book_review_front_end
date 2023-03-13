import {React,useMemo} from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { getGraph, serverHost, useData } from '../data';
import "../GraphPage/Graph.css"


function Graph() {
  const context = useData()
  // let data = { nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], links: [{ source: "1", target: "2" }, { source: "2", target: "3" }, { source: "4", target: "1" }, { source: "4", target: "2" }]}



  let expand = (node, event) => {
    getGraph()
    console.log(node.id);
  }
  return useMemo(() => {
    return (
      <div className='Graph'>
        <ForceGraph2D graphData={context.graph}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillText(node.id, node.x, node.y);
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            // node.__bckgDimensions = bckgDimensions;
          }}
          onNodeClick={(node, event) => { expand(node, event) }}
          width={500}
          height={600}
          backgroundColor={"rgb(255 255 255)"}
          linkColor={"rgb(31 120 50)"}
          linkOpacity={0.9}
          graph2ScreenCoords={(0, 0)}
          enablePanInteraction={false}
        />
      </div>
    )
  }, [context.graph])

}

export default Graph;
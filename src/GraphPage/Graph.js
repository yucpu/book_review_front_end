import { React, useMemo } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import threeSpritetext from 'three-spritetext';
import { getGraph, useData } from '../data';
import { Modal, Spin } from 'antd';
import "../GraphPage/Graph.css"


function Graph() {
  const context = useData()
  // let data = { nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], links: [{ source: "1", target: "2" }, { source: "2", target: "3" }, { source: "4", target: "1" }, { source: "4", target: "2" }]}

  return useMemo(() => {
    return (
      <Modal id='BookGraph' open={context.graphShow}
        onCancel={() => context.setGraphShow(false)}
        footer={null}
        width={"50%"}
        bodyStyle={{ height: "500px" }}
        title="Book Relation Graph"
      >

        <div className='Graph'>
          { context.graphLoading ? 
            <Spin />:
            <ForceGraph3D
              graphData={context.graph}
              nodeThreeObject={node => {
                const sprite = new threeSpritetext(node.title)
                sprite.color = node.color;
                sprite.textHeight = 3;
                
                return sprite;
              }}
              width={700}
              height={500}
              backgroundColor={"rgb(255 255 255)"}
              linkColor={() => "#1677ff"}
              linkWidth={1}
              onNodeClick={node=>{context.setQuery(node.title)}}
            />
          }
        </div>
      </Modal>
    )
  }, [context.graph, context.graphShow, context.graphLoading])

}

export default Graph;
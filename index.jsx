import { SigmaContainer, ControlsContainer, ZoomControl, SearchControl, FullScreenControl } from "@react-sigma/core"
import { CirclePackGraph } from "../../components/CirclePackGraph"
import { EdgeControl } from "../../components/EdgeControl"
import { useData } from '../../utils/useData'
import { scaleSqrt, scaleLinear,extent } from 'd3'

const nodeSize = (d) => d.symbolSize
const edgeSize = (d) => d.size

export const Home = () => {
  const dataset = useData()

  if(!dataset){
    return <pre>loading...</pre>
  }
  const [edgeMin,edgeMax] = extent(dataset.edges,edgeSize);
  const nodeScale = scaleSqrt().domain(extent(dataset.nodes,nodeSize)).range([1,25]).nice().clamp(true);
  const edgeScale = scaleLinear().domain([edgeMin,edgeMax]).range([1,20]).nice().clamp(true);

  return (
    <SigmaContainer>
      <CirclePackGraph dataset={dataset} nodeScale={nodeScale} edgeScale={edgeScale}/>
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />     
      </ControlsContainer>
      <ControlsContainer position={"top-left"} style={{width:"200px",border:"none"}}>
        <SearchControl style={{border: "1px solid black",marginBottom:"20px"}}/>
        <EdgeControl max={edgeMax} min={edgeMin} edgeScale={edgeScale}/>
      </ControlsContainer>
    </SigmaContainer>
  );
};
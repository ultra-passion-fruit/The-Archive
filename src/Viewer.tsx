import React, {FC} from "react";
import InfiniteViewer from "react-infinite-viewer";
import MoveableSpecimen from "./MoveableSpecimen";
import { Specimen } from './View'
import Moveable from "react-moveable";

type CollectionProps = {
    data: Specimen[];
}

const Viewer: FC<CollectionProps> = ({ data }) => {

    const viewerRef = React.useRef<InfiniteViewer>(null);

    React.useEffect(() => {
        setTimeout(() => {
            viewerRef.current!.scrollCenter();
        }, 100);
    }, []);

    const scrollOptions = {
        container: () => viewerRef.current!.getContainer(),
        threshold: 20,
        getScrollPosition: () => {
            return [
                viewerRef.current!.getScrollLeft({ absolute: true }),
                viewerRef.current!.getScrollTop({ absolute: true }),
            ];
        },
    };

    let gridSize = 1;

    return (
        <div className="viewer">
            {/* <h1>This is the View page.</h1> */}
            {/* <div className="control-panel-container"> */}
                <button className="button" onClick={() => {
                    viewerRef.current!.scrollCenter();
                    }} style={{
                        zIndex: 1
                }}>Center</button>
            {/* </div> */}
            <InfiniteViewer className="infinite-viewer"
                ref={viewerRef}
                usePinch={true}
                useWheelScroll={true}
                useAutoZoom={true}
                zoomRange={[0.1, 10]}
                maxPinchWheel={10}
                zoomBase={"viewport"}
                onScroll={({ scrollLeft, scrollTop }) => {
                    // Move background proportionally to user moving around
                        // i.e. Makes it seems like grid is fixed
                    viewerRef.current!.getContainer().style.backgroundPosition = `${-scrollLeft*gridSize}px ${-scrollTop*gridSize}px`;
                }}
                onPinch={({ zoom, clientX, clientY }) => {
                    // Zooms grid in/out as user zooms in/out
                    gridSize = zoom; // Adjust grid size based on zoom level
                    // console.log(gridSize);
                    let localGrid = gridSize*50;
                    
                    viewerRef.current!.getContainer().style.backgroundSize = `${localGrid}px ${localGrid}px`;
                    
                    // console.log("pinch started!");
                    if (zoom < 0.3) {
                        viewerRef.current!.getContainer().style.filter = "blur(5px)";
                    } else {
                        viewerRef.current!.getContainer().style.filter = "blur(0px)";
                    }
                }}>
                <MoveableSpecimen collection={data}/>
            </InfiniteViewer>
        </div>
    );
}

export default Viewer;
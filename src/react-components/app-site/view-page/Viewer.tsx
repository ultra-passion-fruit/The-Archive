import React, {FC, useState} from "react";
import InfiniteViewer from "react-infinite-viewer";
import MoveableSpecimen from "./MoveableSpecimen";
import { TSpecimen } from './View'
import Moveable from "react-moveable";

type CollectionProps = {
    data: TSpecimen[];
}

const Viewer: FC<CollectionProps> = ({ data }) => {

    let [gridSize, setGridSize] = useState(1); 

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

    return (
        <div className="viewer">
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
                    // console.log("On Move:" + gridSize);
                    viewerRef.current!.getContainer().style.backgroundPosition = `${-scrollLeft*gridSize}px ${-scrollTop*gridSize}px`;
                }}
                onPinch={({ zoom, clientX, clientY }) => {
                    // Zooms grid in/out as user zooms in/out
                    setGridSize(zoom); // Adjust grid size based on zoom level
                    // console.log("On Zoom: " + gridSize);
                    let localGrid = gridSize*40;
                    
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
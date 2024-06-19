import React, {FC} from "react";
import Moveable from "react-moveable";
import { Collection } from './View'

type CollectionProps = {
    collection: Collection;
}

const MoveableSpecimen: FC<CollectionProps> = ({ collection }) => {

    const { specimen } = collection;

    return (
        <div className="viewport">

            {/* {collection.forEach((specimen) => {
                <img className="target" src={specimen.image} height={specimen.height} width={specimen.width} key={specimen.id}/>
            })} */}
            <img className="target" alt={specimen.alt} src={specimen.image} height={specimen.height} width={specimen.width} key={specimen.id}/>
            {/* <img className="target" src={collection[1].image} height={collection[1].height} width={collection[1].width} key={collection[1].id}/>
            <img className="target" src={collection[2].image} height={collection[2].height} width={collection[2].width} key={collection[2].id}/> */}
            <Moveable
                scrollable={true}
                // scrollOptions={scrollOptions}
                target={".target"}
                individualGroupable={true}
                draggable={true}
                resizable={false}
                scalable={true}
                keepRatio={true}
                rotatable={false}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
                // onScroll={({ direction }) => {
                //     viewerRef.current!.scrollBy(direction[0] * 10, direction[1] * 10);
                // }}
                >
            </Moveable>
        </div>
    )
};

export default MoveableSpecimen;
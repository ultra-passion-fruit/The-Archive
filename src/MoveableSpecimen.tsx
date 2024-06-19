import React, {FC} from "react";
import Moveable from "react-moveable";
import { Specimen } from './View'

type CollectionProps = {
    collection: Specimen[];
}

const MoveableSpecimen: FC<CollectionProps> = ({ collection }) => {

    return (
        <div className="viewport">

            {collection.map((specimen) => (
                <img className="target" src={specimen.image} height={specimen.height} width={specimen.width} key={specimen.id}/>
            ))}
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
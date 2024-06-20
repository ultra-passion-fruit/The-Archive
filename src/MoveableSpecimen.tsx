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
                target={".target"}
                individualGroupable={true}
                draggable={true}
                resizable={false}
                scalable={true}
                keepRatio={true}
                rotatable={false}
                origin={false}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
                >
            </Moveable>
        </div>
    )
};

export default MoveableSpecimen;
import React, {FC} from "react";
import Moveable, { MoveableRefObject, MoveableRefTargetType } from "react-moveable";
import Selecto from "react-selecto";
import { TSpecimen } from './View'

type CollectionProps = {
    collection: TSpecimen[];
}

const MoveableSpecimen: FC<CollectionProps> = ({ collection }) => {

    const [targets, setTargets] = React.useState<Array<any>>([]);
    const moveableRef = React.useRef<Moveable>(null);
    const selectoRef = React.useRef<Selecto>(null);

    return (
        <div className="viewport">

            <Moveable
                ref={moveableRef}
                scrollable={true}
                target={targets}
                draggable={true}
                resizable={false}
                scalable={true}
                keepRatio={true}
                rotatable={false}
                origin={false}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
                onClickGroup={e => {
                    selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onRenderGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }}
            />

            {/*
                1. Assign moveable target to empty "targets" array
                2. Assign ".target" class as selectableTargets
                3. onSelect event uses setTargets state function to add the
                    items selected to the empty "targets" array
                4. Selected items now act as moveable components only when selected
            */}
            <Selecto
                ref={selectoRef}
                dragContainer={".infinite-viewer"}
                selectableTargets={[".target"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={(e: any) => {
                    const target = e.inputEvent.target;
                    if (
                        moveableRef.current!.isMoveableElement(target)
                        || targets!.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelect={e => {
                    if (e.isDragStartEnd) {
                        return;
                    }
                    setTargets(e.selected);
                }}
                onSelectEnd={e => {
                    if (e.isDragStartEnd) {
                        e.inputEvent.preventDefault();
                        moveableRef.current!.waitToChangeTarget().then(() => {
                            moveableRef.current!.dragStart(e.inputEvent);
                        });
                    }
                    setTargets(e.selected);
                }}
            />
            {collection.map((specimen) => (
                <img
                    className={`target target${specimen._id}`}
                    src={specimen.imagePath}
                    height={specimen.height}
                    width={specimen.width}
                    key={specimen._id}
                />
            ))}
        </div>
    )
};

export default MoveableSpecimen;
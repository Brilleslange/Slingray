import type {Color} from "../types/color.ts";
import * as React from "react";
import {type ChangeEvent} from "react";

type Props = {
    expansionStates: Map<string, boolean>,
    colors: Color[]
}

export const ExcludeColors: React.FC<Props> = ({expansionStates, colors}) => {
    const allowedColors = Array.from(colors).filter(color => expansionStates.get(color.expansion));

    const mirrorCheck = (e: ChangeEvent) => {
        const id = e.currentTarget.id;
        const oppositeId = id.split("-").reverse().join("-");
        if (id !== oppositeId) {
            const opposite = document.getElementById(oppositeId) as HTMLInputElement;
            opposite.checked = (e.currentTarget as HTMLInputElement).checked;
        }
    }

    return <div className={"collapse collapse-arrow"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Exclude colors
        </div>
        <div className={"collapse-content"}>
            <table>
                <thead className={"vertical-header"}>
                <tr>
                    <th/>
                    {allowedColors.map(color =>
                        <th key={color.color} scope={"col"}>{color.color}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {allowedColors.map(firstColor =>
                    <tr key={firstColor.color}>
                        <th scope={"row"}>{firstColor.color}</th>
                        {allowedColors.map(secondColor =>
                            <td key={secondColor.color}>
                                <input
                                    type={"checkbox"}
                                    className={"checkbox"}
                                    name={"color_exclude"}
                                    id={`${firstColor.color.toLowerCase()}-${secondColor.color.toLowerCase()}`}
                                    onChange={mirrorCheck}
                                />
                            </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}
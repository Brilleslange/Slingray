import type {Color} from "../types/color.ts";
import * as React from "react";
import {type ChangeEvent} from "react";

type Props = {
    expansionStates: Map<string, boolean>,
    colors: Color[]
}

export const ExcludeColors: React.FC<Props> = ({expansionStates, colors}) => {
    const isAllowedColor = (color: Color) => expansionStates.get(color.expansion);

    const mirrorCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const oppositeId = id.split("-").reverse().join("-");
        if (id !== oppositeId) {
            const opposite = document.getElementById(oppositeId) as HTMLInputElement;
            opposite.checked = e.target.checked;
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
                    {colors.map(color =>
                        <th
                            key={color.color}
                            scope={"col"}
                            style={isAllowedColor(color) ? undefined : {display: "none"}}
                        >
                            {color.color}
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {colors.map(firstColor =>
                    <tr
                        key={firstColor.color}
                        style={isAllowedColor(firstColor) ? undefined : {display: "none"}}
                    >
                        <th scope={"row"}>
                            {firstColor.color}
                        </th>
                        {colors.map(secondColor =>
                            <td
                                key={secondColor.color}
                                style={isAllowedColor(secondColor) ? undefined : {display: "none"}}
                            >
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
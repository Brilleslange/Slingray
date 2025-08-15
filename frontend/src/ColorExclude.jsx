import {BASE_COLORS, COLORS, POK_COLORS} from "../constants/colors.js";

const ColorExclude = ({expansions}) => {
    const isAllowedColor = (color) => BASE_COLORS.has(color) || (Boolean(expansions?.pok) && POK_COLORS.has(color))
    const allowedColors = Array.from(COLORS).filter(isAllowedColor);

    const mirrorCheck = (e) => {
        const id = e.currentTarget.id;
        const oppositeId = id.split("-").reverse().join("-");
        if (id !== oppositeId) {
            const opposite = document.getElementById(oppositeId);
            opposite.checked = e.currentTarget.checked;
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
                        <th key={color} scope={"col"}>{color}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {allowedColors.map(firstColor =>
                    <tr key={firstColor}>
                        <th scope={"row"}>{firstColor}</th>
                        {allowedColors.map(secondColor =>
                            <td key={secondColor}>
                                <input
                                    type={"checkbox"}
                                    name={"color_exclude"}
                                    id={`${firstColor.toLowerCase()}-${secondColor.toLowerCase()}`}
                                    onChange={mirrorCheck}
                                />
                            </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}

export default ColorExclude;
export default function Help() {
    return (<div className={"collapse collapse-arrow bg-base-300"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Help
        </div>
        <div className={"collapse-content"}>
            <div className={"flex flex-col gap-1"}>
                <div className={"collapse bg-base-200"}>
                    <input type={"checkbox"}/>
                    <div className={"collapse-title"}>
                        What is this?
                    </div>
                    <div className={"collapse-content text-sm"}>{
                        "This is a color assigner for Fantasy Flight Games' grand strategy board game Twilight Imperium 4th Edition. " +
                        "It assigns colors to your selection of factions based on which colors are most fitting for that faction."
                    }</div>
                </div>
                <div className={"collapse bg-base-200"}>
                    <input type={"checkbox"}/>
                    <div className={"collapse-title"}>
                        How do I use it?
                    </div>
                    <div className={"collapse-content text-sm "}>
                        <ol className={"list-decimal pl-4"}>
                            <li>Open the Factions accordion and select the factions you want to assign colors to.</li>
                            <li>(Optional) Change any settings you would like.</li>
                            <li>Open the Results accordion and press the button.</li>
                        </ol>
                    </div>
                </div>
                <div className={"collapse bg-base-200"}>
                    <input type={"checkbox"}/>
                    <div className={"collapse-title"}>
                        How does it work?
                    </div>
                    <div className={"collapse-content text-sm "}> {
                        "Each faction has a score for each color. " +
                        "The score is based on how prominent the color is on the faction's tokens and sheet. " +
                        "When assigning colors, the application finds all possible color assignments. " +
                        "For each assignment, it finds what score each faction has for the color they have been assigned, " +
                        "and adds them together. The assignment with the highest sum is selected. " +
                        "If there are multiple assignments with the same highest sum, a random one is selected. " +
                        "In that case, pressing the Assign colors button multiple times may result in different assignments."
                    } </div>
                </div>
                <div className={"collapse bg-base-200"}>
                    <input type={"checkbox"}/>
                    <div className={"collapse-title"}>
                        I don't have all the expansions, what do I do?
                    </div>
                    <div className={"collapse-content text-sm"}>{
                        "Open the Options accordion under Configuration and uncheck the expansions you don't have."
                    }</div>
                </div>
                <div className={"collapse bg-base-200"}>
                    <input type={"checkbox"}/>
                    <div className={"collapse-title"}>
                        I have a hard time distinguishing colors from each other, how can I avoid certain color combinations?
                    </div>
                    <div className={"collapse-content text-sm"}>
                        <p>{
                            "Open the Exclude colors accordion under Configuration. If you check a color combination, " +
                            "those two colors will never appear together in the results. " +
                            "For example, if you check the checkbox in the red row and the green column " +
                            "(which will also check the checkbox in the green row and the red column), " +
                            "the result may contain either red or green, but never both."
                        }</p>
                        <p>{
                            "If you want to exclude a color altogether, you can check the checkbox in that " +
                            "color's row and column. For example, if you want to exclude blue, " +
                            "you can check the checkbox in the blue row and the blue column."
                        }</p>
                    </div>
                </div>
                <div className={"collapse bg-base-200"}>
                    <input type={"checkbox"}/>
                    <div className={"collapse-title"}>
                        I don't agree with some of the results, can I adjust them?
                    </div>
                    <div className={"collapse-content text-sm"}>{
                        "If you disagree with the color assignments, you can open the Color weighting accordion " +
                        "under Configuration and adjust each faction's score for each colors. " +
                        "The higher the score, the more likely the color."
                    }</div>
                </div>
            </div>
        </div>
    </div>)
}
import React from "react";
import {DARK_GREY, LIGHT_GREY} from "../../../utils/constants";

interface LineProps{
    padding?: number;
}

const Line: React.FC<LineProps> = ({padding}) => {
    return(
        <div style={{
            width: '100%',
            height: 1,
            backgroundColor: DARK_GREY,
            paddingLeft: padding,
            paddingRight: padding,
            paddingBottom:padding
        }}/>
    )
}

export default Line;

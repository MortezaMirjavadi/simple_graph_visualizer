import React from "react";

export default ({text, onClick, BtnId}) => (
    <button
        id={BtnId}
        onClick={onClick} className={"button"}>
        {text}
    </button>
)
import React from "react";

export default ({ value, getInput, inputId }) => (
  <div>
    <textarea
      value={value}
      id={inputId}
      onChange={(e) => getInput(e.target.value)}
      className={"input"}
    />
  </div>
);

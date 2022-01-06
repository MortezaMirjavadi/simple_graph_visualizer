import React from "react";
import GraphContainer from "./GraphContainer";
import InputContainer from "./InputContainer";
import Button from "../Components/Button";

const styleRow = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
};
const styleColumn = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};
const btnStyle = {
  width: "62%",
};

function App() {
  const [textInput, setTextInput] = React.useState("");
  const graphRef = React.useRef(null);

  function handleChange(e) {
    setTextInput(e.target.value);
  }

  function clean() {
    graphRef.current.clearGraph();
    setTextInput("");
  }

  function create() {
    graphRef.current.createGraph(textInput);
  }

  return (
    <div style={styleColumn}>
      <div style={styleRow}>
        <InputContainer
          id="graph-input"
          text={textInput}
          onChange={handleChange}
        />
        <GraphContainer ref={graphRef} />
      </div>
      <div className="btn-container" style={btnStyle}>
        <Button
          className="button"
          id="create-btn"
          text="Create"
          onClick={create}
        />
        <Button
          className="button"
          id="clean-btn"
          text="Clean"
          onClick={clean}
        />
        <div>
          <h1>Simple Graph Visualizer</h1>
        </div>
      </div>
    </div>
  );
}

export default App;

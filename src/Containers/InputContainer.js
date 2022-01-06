import React from "react";

function InputContainer({text, onChange}) {
  return <textarea rows={40} className="input input-container wrapper" 
      value={text} onChange={onChange}
  />;
}

export default InputContainer;

import React from "react";

const ITEM_TYPE = {
  NODE: "node",
  LINE: "line",
  TEXT: "TEXT",
};

const GraphContainer = React.forwardRef((props, ref) => {
  const [items, setItems] = React.useState([]);

  React.useImperativeHandle(ref, () => ({
    clearGraph: () => {
      setItems([]);
    },
    createGraph: (graphInput) => {
      const _items = [];
      graphInput.split("\n").forEach((line) => {
        if (line.length === 0) return;
        const [item1, item2] = line.trim().split(" ");

        let _node1 = null,
          _node2 = null;
        const _findNode1 = _items.find(
          (x) => x.type === ITEM_TYPE.NODE && x.id === item1
        );
        const _findNode2 = _items.find(
          (x) => x.type === ITEM_TYPE.NODE && x.id === item2
        );
        if (!_findNode1 && item1) {
          _node1 = createNodeFactory(item1);
          _items.push(_node1);
          _items.push(createTextFactory(item1, _node1.cx, _node1.cy));
        }
        if (!_findNode2 && item2) {
          _node2 = createNodeFactory(item2);
          _items.push(_node2);
          _items.push(createTextFactory(item2, _node2.cx, _node2.cy));
        }
        if (
          (_node1 !== null || _findNode1) &&
          (_node2 !== null || _findNode2)
        ) {
          _items.push(
            createLineFactory(
              `${_findNode1 ? _findNode1.id : item1}${
                _findNode2 ? _findNode2.id : item2
              }`,
              _findNode1 ? _findNode1.cx : _node1.cx,
              _findNode2 ? _findNode2.cx : _node2.cx,
              _findNode1 ? _findNode1.cy : _node1.cy,
              _findNode2 ? _findNode2.cy : _node2.cy
            )
          );
        }
      });
      setItems(_items);
    },
  }));

  function randomPosition(node) {
    const x = Math.floor(Math.random() * 703) + 50;
    const y = Math.floor(Math.random() * 403) + 50;
    node.cx = x.toString();
    node.cy = y.toString();
  }
  function createNodeFactory(id) {
    const _temp = { id, type: ITEM_TYPE.NODE, r: "30" };
    randomPosition(_temp);
    return _temp;
  }
  function createTextFactory(label, x, y) {
    return { label, type: ITEM_TYPE.TEXT, dataTest: label, x, y };
  }
  function createLineFactory(id, x1, x2, y1, y2) {
    return { id, type: ITEM_TYPE.LINE, x1, x2, y1, y2 };
  }

  function createNode({ id, cx, cy, r, index }) {
    return (
      <circle
        key={index}
        className="node"
        id={id}
        cx={cx}
        cy={cy}
        r={r}
      ></circle>
    );
  }
  function createText({ label, dataTest, x, y, index }) {
    return (
      <text
        key={index}
        className="labels"
        data-test={dataTest}
        x={x}
        y={y}
        textAnchor="middle"
      >
        {label}
      </text>
    );
  }
  function createLine({ id, x1, x2, y1, y2, index }) {
    return (
      <line
        key={index}
        className="line"
        id={id}
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
      ></line>
    );
  }
  function factory(item, index) {
    switch (item.type) {
      case ITEM_TYPE.NODE: {
        return createNode({
          index,
          id: item.id,
          cx: item.cx,
          cy: item.cy,
          r: "30",
        });
      }
      case ITEM_TYPE.TEXT: {
        return createText({
          index,
          label: item.label,
          dataTest: item.label,
          x: item.x,
          y: item.y,
        });
      }
      case ITEM_TYPE.LINE: {
        return createLine({
          index,
          id: item.id,
          x1: item.x1,
          x2: item.x2,
          y1: item.y1,
          y2: item.y2,
        });
      }
      default: {
      }
    }
  }

  return (
    <div className="container graph">
      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        className="graph"
        aria-labelledby="title"
        role="img"
      >
        {items.length > 0 && items.map((item, index) => factory(item, index))}
      </svg>
    </div>
  );
});

export default GraphContainer;

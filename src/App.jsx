import React from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { useBrain, BrainContext } from "./Cortex";
import { ROW_COUNT, COLUMN_COUNT } from "./config";
import { ValueContext, useValue } from "./Values";

function Cell({ columnIndex, rowIndex, style }) {
  const initialValue = useValue(rowIndex, columnIndex);
  const id = `${rowIndex}-${columnIndex}`;
  const cellContent = (id, value) => `${id}:${value}`;
  const brain = useBrain();
  const [value, setValue] = React.useState(cellContent(id, initialValue));

  React.useEffect(() => {
    const rxMsg = (message) => {
      setValue(cellContent(id, message));
    };

    brain.addListener(id, rxMsg);

    return () => {
      brain.removeListener(id);
    };
  }, []);

  return (
    <div style={style}>
      <div style={{ height: '100%', width: '100%', outline: "1px solid blue" }}>{value}</div>
    </div>
  );
}

function MyGrid() {
  const [height, setHeight] = React.useState(400);
  const [width, setWidth] = React.useState(800);
  const renderCount = React.useRef(0);
  const brain = useBrain();
  const interval = React.useRef(null);

  React.useEffect(() => {
    if (interval.current === null) {
      interval.current = setInterval(() => {
        brain.broadcast();
      }, 1000);
    }
  }, []);

  renderCount.current += 1;
  console.log("rerendering parent grid", renderCount.current);

  return (
    <div>
      <input
        value={height}
        onChange={(e) => setHeight(e.currentTarget.value)}
      />
      <input value={width} onChange={(e) => setWidth(e.currentTarget.value)} />
      <Grid
        columnCount={COLUMN_COUNT}
        columnWidth={130}
        height={parseInt(height) || 0}
        rowCount={ROW_COUNT}
        rowHeight={35}
        width={parseInt(width) || 0}
      >
        {Cell}
      </Grid>
    </div>
  );
}

export function App() {
  return (
    <BrainContext>
      <ValueContext>
        <MyGrid />
      </ValueContext>
    </BrainContext>
  );
}

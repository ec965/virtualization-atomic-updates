import { FixedSizeGrid as Grid } from "react-window";
import { ROW_COUNT, COLUMN_COUNT } from "./config";
import { useInterval } from "./useInterval";
import { OutlineDiv } from "./OutlineDiv";
import { useRenderCount } from "./useRenderCount";
import { getContent, getId } from "./getters";
import { useBrain } from "./Cortex";
import { useValue } from "./Values";
import React from "react";

function MyCell({ columnIndex, rowIndex, style }) {
  const initialValue = useValue(rowIndex, columnIndex);
  const id = getId(rowIndex, columnIndex);
  const brain = useBrain();
  const [value, setValue] = React.useState(getContent(id, initialValue));

  React.useEffect(() => {
    const rxMsg = (message) => {
      setValue(getContent(id, message));
    };

    brain.addListener(id, rxMsg);

    return () => {
      brain.removeListener(id);
    };
  }, []);

  return (
    <div style={style}>
      <OutlineDiv>{value}</OutlineDiv>
    </div>
  );
}

export function MyGrid({ width, height }) {
  const brain = useBrain();
  const renderCount = useRenderCount();

  useInterval(() => {
    brain.broadcast();
  });

  return (
    <div>
      <h2>With Cortex.Brain</h2>
      <h3>Render Count: {renderCount}</h3>
      <Grid
        columnCount={COLUMN_COUNT}
        columnWidth={130}
        height={parseInt(height) || 0}
        rowCount={ROW_COUNT}
        rowHeight={35}
        width={parseInt(width) || 0}
      >
        {MyCell}
      </Grid>
    </div>
  );
}

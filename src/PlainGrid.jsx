import { FixedSizeGrid as Grid } from "react-window";
import { ROW_COUNT, COLUMN_COUNT } from "./config";
import { createInitialValues } from "./Values";
import { useInterval } from "./useInterval";
import { useRenderCount } from "./useRenderCount";
import { getContent, getId } from './getters';
import { OutlineDiv } from './OutlineDiv';
import React from 'react';

function PlainCell({ columnIndex, rowIndex, style, data }) {
  const id = getId(rowIndex, columnIndex);
  const value = getContent(id, data[rowIndex][columnIndex]);
  return (
    <div style={style}>
      <OutlineDiv>{value}</OutlineDiv>
    </div>
  );
}

export function PlainGrid({ height, width }) {
  const [data, setData] = React.useState(
    createInitialValues(ROW_COUNT, COLUMN_COUNT)
  );
  const renderCount = useRenderCount();

  useInterval(() => {
    const newData = data.map((row) =>
      row.map(() => Math.floor(Math.random() * 1000))
    );
    setData(newData);
  });

  return (
    <div>
      <h2>Plain Grid</h2>
      <h3>Render Count: {renderCount}</h3>
      <Grid
        columnCount={COLUMN_COUNT}
        columnWidth={130}
        height={parseInt(height) || 0}
        rowCount={ROW_COUNT}
        rowHeight={35}
        width={parseInt(width) || 0}
        itemData={data}
      >
        {PlainCell}
      </Grid>
    </div>
  );
}

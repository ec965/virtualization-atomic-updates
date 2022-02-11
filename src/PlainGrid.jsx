import { FixedSizeGrid as Grid, areEqual } from "react-window";
import { ROW_COUNT, COLUMN_COUNT } from "./config";
import { createInitialValues } from "./Values";
import { useInterval } from "./useInterval";
import { useRenderCount } from "./useRenderCount";
import { getContent, getId } from "./getters";
import { OutlineDiv } from "./OutlineDiv";
import React from "react";
import _ from 'lodash';

function useBackgroundColor() {
  const index = React.useRef(0);
  const colors = ["red", "green", "yellow", "orange"];
  index.current += 1;
  if (index.current >= colors.length) {
    index.current = 0;
  }

  return colors[index.current];
}

function PlainCell({ columnIndex, rowIndex, style, data }) {
  const id = getId(rowIndex, columnIndex);
  const value = getContent(id, data[rowIndex][columnIndex].value);
  const backgroundColor = useBackgroundColor();
  return (
    <div style={style}>
      <OutlineDiv style={{ backgroundColor }}>
        <input
          value={data[rowIndex][columnIndex].value}
          onChange={(e) =>
            data[rowIndex][columnIndex].onEdit(e.currentTarget.value)
          }
        />
        {value}
      </OutlineDiv>
    </div>
  );
}

const PlainCellMemo = React.memo(PlainCell, (next, prev) => {
  const n = { ...next };
  const p = { ...prev };
  if (!_.isEqual(n.data, p.data)) console.log(next.data[next.rowIndex][next.columnIndex].value, prev.data[prev.rowIndex][prev.columnIndex].value);
  n.data = next.data[next.rowIndex][next.columnIndex].value;
  p.data = prev.data[prev.rowIndex][prev.columnIndex].value;
  if (!areEqual(n, p)) console.log("in memo", n, p, areEqual(n, p));
  return areEqual(n, p);
});

export function PlainGrid({ height, width }) {
  const [data, setData] = React.useState(
    createInitialValues(ROW_COUNT, COLUMN_COUNT).map((row, i) => {
      return row.map((col, j) => {
        return {
          value: col,
          onEdit: (val) => {
            const updated = _.cloneDeep(data);
            updated[i][j].value = val;
            setData(updated);
          },
        };
      });
    })
  );
  const renderCount = useRenderCount();

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
        {PlainCellMemo}
      </Grid>
    </div>
  );
}

import React from "react";
import { ROW_COUNT, COLUMN_COUNT } from "./config";
import { useBrain } from "./Cortex";
import { getId } from './getters'

export function createInitialValues(rowCount, columnCount) {
  return new Array(rowCount)
    .fill(null)
    .map((_val) => new Array(columnCount).fill("initial"));
}

const Value = React.createContext(null);

export function ValueContext({ children }) {
  const values = React.useRef(createInitialValues(ROW_COUNT, COLUMN_COUNT));
  const brain = useBrain();

  React.useEffect(() => {
    const listener = (rowIndex, columnIndex) => (msg) => {
      values.current[rowIndex][columnIndex] = msg;
    };

    for (let rowIndex = 0; rowIndex < values.current.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < values.current[rowIndex].length;
        columnIndex++
      ) {
        brain.addListener(
          getId(rowIndex, columnIndex),
          listener(rowIndex, columnIndex)
        );
      }
    }
  }, []);

  return <Value.Provider value={values.current}>{children}</Value.Provider>;
}

export function useValue(rowIndex, columnIndex) {
  const values = React.useContext(Value);
  if (values === null) {
    throw new Error("Value Context is not initialized.");
  }
  return values[rowIndex][columnIndex];
}

import React from "react";
import { BrainContext } from "./Cortex";
import { ValueContext } from "./Values";
import { MyGrid } from './MyGrid';
import { PlainGrid } from './PlainGrid';

export function App() {
  const [height, setHeight] = React.useState(400);
  const [width, setWidth] = React.useState(800);
  const [withBrain, setWithBrain] = React.useState(false);
  return (
    <div>
      <label>Height</label>
      <input
        value={height}
        onChange={(e) => setHeight(e.currentTarget.value)}
      />
      <label>Width</label>
      <input value={width} onChange={(e) => setWidth(e.currentTarget.value)} />
      <label>Use Cortex.Brain</label>
      <input
        type="checkbox"
        onChange={(e) => setWithBrain(e.currentTarget.checked)}
        checked={withBrain}
      />
      {withBrain ? (
        <BrainContext>
          <ValueContext>
            <MyGrid height={height} width={width} />
          </ValueContext>
        </BrainContext>
      ) : (
        <PlainGrid height={height} width={width} />
      )}
    </div>
  );
}

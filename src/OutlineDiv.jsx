import React from 'react';

export function OutlineDiv({ style, children }) {
  return (
    <div style={{ height: "100%", width: "100%", outline: "1px solid blue", ...style }}>
      {children}
    </div>
  );
}


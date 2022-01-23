import React from 'react';

export function OutlineDiv({ children }) {
  return (
    <div style={{ height: "100%", width: "100%", outline: "1px solid blue" }}>
      {children}
    </div>
  );
}


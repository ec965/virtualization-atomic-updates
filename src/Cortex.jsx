import React from "react";

class Cortex {
  constructor() {
    this.listeners = new Map();
  }

  _getValue() {
    return Math.floor(Math.random() * 1000);
  }

  broadcast() {
    for (const listenerArr of this.listeners.values()) {
      const value = this._getValue();
      for (const listener of listenerArr) {
        listener(value);
      }
    }
  }

  addListener(id, rx) {
    if (this.listeners.has(id)) {
      const arr = this.listeners.get(id);
      arr.push(rx);
      this.listeners.set(id, arr);
    } else {
      this.listeners.set(id, [rx]);
    }
  }

  removeListener(id) {
    this.listeners.delete(id);
  }
}

const Brain = React.createContext(null);

export function BrainContext({ children }) {
  const brain = React.useRef(new Cortex());

  return <Brain.Provider value={brain.current}>{children}</Brain.Provider>;
}

export function useBrain() {
  const brain = React.useContext(Brain);
  if (brain === null) {
    throw Error("Cortex.Brain has not yet been initialized.");
  }

  return brain;
}

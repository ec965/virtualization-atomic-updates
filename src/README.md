# Atomic Updates on Virtualized Cells

Demonstration of replacing cell content without rerendering the entire Grid.

We should be able to rerender individual cells without rerendering the entire table when cell content changes.

## Cortex

Cortex is a messaging queue that broadcasts each cell's new value to that cell so that cells can update without rerender the entire table.

This implementation used Context with a Reference.
Another implementation might be able to use the event emitter API.

## MyGrid

This grid uses Cortex to broadcast updates to each cell.

## PlainGrid

The plain grid is a regular implementation of updating values by overwritting the entire cell data array.

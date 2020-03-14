
export interface State {
  memory: number;
  result: number;
}

export function reset(): State {
  return { memory: 0, result: 0 }
}

export function add(state: State, adder: number): State {
  return { memory: state.memory, result: state.result + adder };
}

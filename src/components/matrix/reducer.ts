import { MatrixState, MatrixStateActionType, MatrixStateAction } from './model';

export const initialState: MatrixState = {
    type: MatrixStateActionType.INITIAL,
    width: 0,
    height: 0,
    columns: 0,
    drops: []
};

export function reducer(state: MatrixState, action: MatrixStateAction): MatrixState {
    switch (action.type) {
        case MatrixStateActionType.INITIAL:
            return initialState;
        case MatrixStateActionType.RUNNING:
            return { ...state, ...action.payload, type: action.type };
      default:
        return state;
    }
};
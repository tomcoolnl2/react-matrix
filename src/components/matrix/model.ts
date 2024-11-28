
export interface MatrixState {
    type: MatrixStateActionType; 
    width: number;
    height: number;
    columns: number;
    drops: number[];
}

export type MatrixStateAction = { 
    type: MatrixStateActionType; 
    payload?: Partial<MatrixState>;
}

export enum MatrixStateActionType {
    INITIAL, RUNNING
}
import React from "react";

interface Props {
    children?: React.ReactNode;
    column?: string;
    columnStart?: string;
    columnEnd?: string;
    placeSelf?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const GridItem: React.FC<Props> = ({ children, column, columnStart, columnEnd, placeSelf, onClick }) => {
    const style: React.CSSProperties = {};

    if (column) {
        style.gridColumn = column;
    } else if (columnStart || columnEnd) {
        style.gridColumnStart = columnStart;
        style.gridColumnEnd = columnEnd;
    }

    if (placeSelf) {
        style.placeSelf = placeSelf;
    }

    return (
        <div style={style} onClick={onClick}>
            {children}
        </div>
    );
}
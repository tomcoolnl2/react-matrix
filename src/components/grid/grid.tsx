// Inspiration: https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/Grid/Grid.js

import React from 'react';
import classNames from 'classnames';
import './grid.css';

export type GridItemInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;

export interface GridProps {
    cols?: GridItemInt | string;
    rows?: GridItemInt | string;
    colGap?: 'xs' | 's' | 'm';
    rowGap?: 'xs' | 's' | 'm';
    alignItems?: string;
    padding?: 'xs' | 's' | 'm';
    autoFlow?: string;
    rowHeight?: string;
    colWidth?: string;
    tabIndex?: number;
    forwardRef?: React.Ref<HTMLDivElement>;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Grid: React.FC<GridProps> = (props) => {
    const rowHeight = props.rowHeight ?? '1fr';
    const colWidth = props.colWidth ?? '1fr';

    const style: React.CSSProperties = {
        '--row-height': rowHeight,
        '--col-width': colWidth
    } as unknown as React.CSSProperties;

    if (props.autoFlow) {
        style.gridAutoFlow = props.autoFlow;
    }

    if (typeof props.cols === 'string') {
        style.gridTemplateColumns = props.cols;
    }
    
    if (typeof props.rows === 'string') {
        style.gridTemplateRows = props.rows;
    }

    if (props.alignItems) {
        style.alignItems = props.alignItems;
    }

    return (
        <div
            ref={props.forwardRef}
            tabIndex={props.tabIndex}
            onKeyDown={props.onKeyDown}
            style={{ ...style, ...props.style }}
            className={classNames(
                'container',
                {
                    [`cols-${props.cols}`]: typeof props.cols === 'number',
                    [`rows-${props.rows}`]: typeof props.rows === 'number',
                    [`col-gap-${props.colGap}`]: props.colGap,
                    [`row-gap-${props.rowGap}`]: props.rowGap,
                    [`padding-${props.padding}`]: props.padding
                },
                props.className
            )}
        >
            {props.children}
        </div>
    );
};

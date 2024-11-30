import React from 'react';
import classNames from 'classnames';
import { type GridItemInt, Grid } from '../grid';
import './stripes.css';

type Size = 'xs' | 's' | 'm';

export enum StripesVariant {
    STRAIGHT = 'straight',
    SKEWED = 'skewed',
}

export enum ColorVariant {
    PRIMARY = 'primary',
    SEUNDARY = 'secundary',
}

export enum Direction {
    LEFT = 'left',
    RIGHT = 'right',
}

interface Props {
    size?: Size;
    amount?: GridItemInt;
    variant?: StripesVariant;
    color?: ColorVariant;
    gradient?: boolean;
    gradientDirection?: Direction;
    skewDirection?: Direction;
}

export const Stripes: React.FC<Props> = ({
    amount = 1,
    size = 's',
    variant = StripesVariant.STRAIGHT,
    color = ColorVariant.PRIMARY,
    gradient = false,
    gradientDirection = Direction.RIGHT,
    skewDirection = Direction.RIGHT,
}) => {
    const colGap = size === 'xs' ? 'xs' : 's';
    const opacityStep = (1 - 0.2) / (amount - 1);

    return (
        <Grid cols={amount} colGap={colGap} className="stripes">
            {Array(amount)
                .fill('')
                .map((_, i) => {
                    const opacity = gradient
                        ? gradientDirection === Direction.RIGHT
                            ? 0.2 + i * opacityStep
                            : 1 - (0.2 + i * opacityStep)
                        : 1;
                    return (
                        <div
                            key={`stripe-${i}`}
                            style={{ opacity }}
                            className={classNames(
                                'stripe',
                                `stripe-variant-${color}`,
                                `stripe-gradient-direction-${gradientDirection}`,
                                `stripe-skew-direction-${skewDirection}`,
                                {
                                    'stripe-skewed':
                                        variant === StripesVariant.SKEWED,
                                    [`stripe-${size}`]: size,
                                }
                            )}
                        />
                    );
                })}
        </Grid>
    );
};

// add sizes
// 'straight' | 'skewed'
// skewed direction = 'right'
// bordered option
// variant 'lime' 'emerald'

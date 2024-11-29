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
    SEUNDARY = 'secundary'
}

interface Props {
    size?: Size;
    amount?: GridItemInt;
    variant?: StripesVariant;
    color?: ColorVariant;
    gradient?: boolean;
}

export const Stripes: React.FC<Props> = ({ amount = 1, size = 's', variant = StripesVariant.STRAIGHT, color = ColorVariant.PRIMARY, gradient = false }) => {
    const colGap = size === 'xs' ? 'xs' : 's';
    const opacityStep = (1 - 0.2) / (amount - 1);
    return (
        <Grid cols={amount} colGap={colGap} className='stripes'>
            {Array(amount).fill('').map((_, i) => {
                const opacity = gradient ? 0.2 + i * opacityStep : 1;
                return (
                    <div
                        key={`stripe-${i}`} 
                        style={{ opacity }}
                        className={classNames(
                            'stripe', 
                            `stripe-variant-${color}`,
                            {
                                'stripe-skewed': variant === StripesVariant.SKEWED,
                                [`stripe-${size}`]: size,
                            }
                        )}
                    />)}
            )}
        </Grid>
    )
}


// add sizes
// 'straight' | 'skewed'
// skewed direction = 'right'
// bordered option
// variant 'lime' 'emerald'
import React from 'react';
import { Grid } from '../grid';
import { Direction, Stripes, StripesVariant } from '../stripe/stripes';
import './frame.css';

export const Frame: React.FC = () => {
    return (
        <div className="frame">
            <Grid cols={'1fr 35%'} className="frame-top">
                <div className="frame-top-left">
                    <Stripes
                        amount={1}
                        variant={StripesVariant.SKEWED}
                        size="xs"
                        skewDirection={Direction.RIGHT}
                    />
                </div>
                <div className="frame-top-right">
                    <Stripes
                        amount={5}
                        gradient={true}
                        variant={StripesVariant.SKEWED}
                        size="xs"
                        skewDirection={Direction.LEFT}
                    />
                </div>
            </Grid>
            <div className="frame-body" />
        </div>
    );
};

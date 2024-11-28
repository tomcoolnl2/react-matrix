import React from 'react';
import { MatrixStateActionType } from './model';
import { reducer, initialState } from './reducer';
import * as settings from './settings';


export const Matrix: React.FC = () => {

    const lastFrameTime = React.useRef<number>(Date.now());
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        setContext(canvasRef.current.getContext('2d'));
    }, [canvasRef]);

    React.useEffect(() => {
        if (!context) {
            return;
        }

        initialise();

        window.addEventListener('resize', initialise);

        return () => {
            window.removeEventListener('resize', initialise);
        }
    }, [context]);

    React.useEffect(() => {
        if (state.type !== MatrixStateActionType.RUNNING) {
            return;
        }
        animate();
    }, [state.type])

    const initialise = React.useCallback(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const columns = (width / settings.charFontSize) << 0;
        const drops = Array(columns).fill(1);
        dispatch({ 
            type: MatrixStateActionType.RUNNING,
            payload: { width, height, columns, drops }
        });
    }, []);

    const draw = React.useCallback(() => {
        if (!context) {
            return;
        }

        const { characters, bgColor, charFontSize, charColor, charFontStyle } = settings;
        context.fillStyle = bgColor;
        context.fillRect(0, 0, state.width, state.height);
        context.fillStyle = charColor;
        context.font = charFontStyle;

        for (let i = 0, n = state.drops.length; i < n; i += 1) {
            const text = characters[(Math.random() * characters.length) << 0];
            context.fillText(text, i * 20, state.drops[i] * 20);
            // Reset drops when it reaches the bottom of the canvas
            if (state.drops[i] * charFontSize > state.height && Math.random() > 0.975) {
                state.drops[i] = 0;
            }
            state.drops[i] += 1;
        }
    }, [context, state]);

    const animate = React.useCallback(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - lastFrameTime.current;
        if (elapsedTime > 1000 / settings.frameRate) {
            draw();
            lastFrameTime.current = currentTime;
        }
        requestAnimationFrame(animate);
    }, [draw]);

    return (
        <canvas 
            ref={canvasRef} 
            width={state.width}
            height={state.height}
            className='matrix-canvas fixed top-0 left-0 z-[-1]'
        />
    )
};


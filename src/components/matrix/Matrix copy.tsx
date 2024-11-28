import React from 'react';
import { characters } from './settings';

const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

export const Matrix: React.FC = () => {
    
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

    const [width, setWidth] = React.useState<number>(0);
    const [height, setHeight] = React.useState<number>(0);
    const [columns, setColumns] = React.useState<number>(0);
    const [drops, setDrops] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (!canvasRef?.current) {
            return;
        }
        setCanvas(canvasRef.current);
        setContext(canvasRef.current.getContext('2d'));
    }, [canvasRef]);

    React.useEffect(() => {
        if (!context) {
            return;
        }

        initiate();

        if (!isMobileDevice) {
            window.addEventListener('resize', initiate);
        }

        return () => {
            if (!isMobileDevice) {
                window.removeEventListener('resize', initiate);
            }
        };
    }, [context]);

    const draw = React.useCallback(() => {
        
        if (!context) {
            return;
        }

        context.fillStyle = 'rgba(0, 0, 0, 0.04)';
        context.fillRect(0, 0, width, height);
        context.fillStyle = '#0f0';
        context.font = '15px monospace';

        for (let i = 0, n = drops.length; i < n; i += 1) {
            const text = characters[(Math.random() * characters.length) << 0];
            context.fillText(text, i * 20, drops[i] * 20);  
            if (drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += 1;
        }
    }, [context, width, height, drops]);

    let lastFrameTime = Date.now();
    let frameRate = 20;

    const animate = React.useCallback(() => {

        if (!context) {
            return;
        }

        const currentTime = Date.now();
        const elapsedTime = currentTime - lastFrameTime;

        if (elapsedTime > (1000 / frameRate)) {
            draw();
            lastFrameTime = currentTime;
        }

        requestAnimationFrame(animate);
        
    }, [context, draw]);

    const initiate = React.useCallback(() => {

        if (!canvas) {
            return;
        }

        const width = window.innerWidth;
        canvas.width = width;
        setWidth(width);

        const height = window.innerHeight;
        canvas.height = height;
        setHeight(height);

        setColumns((width / 20) << 0);
        setDrops(Array(columns).fill(1));

        draw();
        animate();

    }, [canvas]);

    return (
        <canvas ref={canvasRef} className='matrix-canvas fixed top-0 left-0 z-[-1]'/>
    );
};


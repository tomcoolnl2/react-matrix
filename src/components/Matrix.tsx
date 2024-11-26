import { useEffect, useRef } from "react";

export const Matrix: React.FC = function Matrix() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let columns = Math.floor(width / 20);

        const characters = [
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "七",
            "八",
            "九",
            "十",
            "人",
            "口",
            "手",
            "目",
            "耳",
            "心",
            "日",
            "月",
            "水",
            "火",
            "山",
            "田",
            "木",
            "石",
            "金",
            "土",
            "风",
            "雨",
            "云",
            "雪",
            "家",
            "国",
            "学",
            "爱",
            "友",
            "天",
            "地",
            "书",
            "车",
            "马",
            "好",
            "快",
            "慢",
            "高",
            "低",
            "大",
            "小",
            "长",
            "短",
            "多",
        ];

        let drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        let frameRate = 20;
        let lastFrameTime = Date.now();

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#0f0";
            ctx.font = "15px monospace";
            for (let i = 0; i < drops.length; i++) {
                const text =
                    characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - lastFrameTime;

            if (elapsedTime > 1000 / frameRate) {
                draw();
                lastFrameTime = currentTime;
            }

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / 20);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
        };

        const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
        if (!isMobileDevice) {
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (!isMobileDevice) {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    return (
        <canvas
            className="matrix-canvas fixed top-0 left-0 z-[-1]"
            ref={canvasRef}
        ></canvas>
    );
};


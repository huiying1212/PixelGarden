import React, { useEffect, useRef } from 'react';

const PixelGarden: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 设置画布大小
        canvas.width = 400;
        canvas.height = 400;

        // 像素大小
        const pixelSize = 8;

        // 清空画布
        ctx.fillStyle = '#87CEEB'; // 天空蓝
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制草地
        ctx.fillStyle = '#90EE90'; // 浅绿色
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

        // 绘制树木
        const drawTree = (x: number, y: number) => {
            // 树干
            ctx.fillStyle = '#8B4513'; // 棕色
            for (let i = 0; i < 6; i++) {
                ctx.fillRect(x, y + (i * pixelSize), pixelSize, pixelSize);
            }

            // 树叶
            ctx.fillStyle = '#228B22'; // 深绿色
            const leafPositions = [
                {x: -2, y: -2}, {x: -1, y: -2}, {x: 0, y: -2}, {x: 1, y: -2},
                {x: -2, y: -1}, {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
                {x: -1, y: 0}, {x: 0, y: 0},
                {x: -1, y: -3}, {x: 0, y: -3}
            ];

            leafPositions.forEach(pos => {
                ctx.fillRect(
                    x + (pos.x * pixelSize),
                    y + (pos.y * pixelSize),
                    pixelSize,
                    pixelSize
                );
            });
        };

        // 绘制小草
        const drawGrass = (x: number, y: number) => {
            ctx.fillStyle = '#228B22';
            ctx.fillRect(x, y, pixelSize, pixelSize);
            ctx.fillRect(x, y - pixelSize, pixelSize, pixelSize);
            ctx.fillRect(x - pixelSize, y - pixelSize, pixelSize, pixelSize);
        };

        // 绘制花朵
        const drawFlower = (x: number, y: number, color: string) => {
            ctx.fillStyle = color;
            // 花瓣
            ctx.fillRect(x, y - pixelSize, pixelSize, pixelSize);
            ctx.fillRect(x - pixelSize, y, pixelSize, pixelSize);
            ctx.fillRect(x + pixelSize, y, pixelSize, pixelSize);
            ctx.fillRect(x, y + pixelSize, pixelSize, pixelSize);
            // 花芯
            ctx.fillStyle = '#FFFF00';
            ctx.fillRect(x, y, pixelSize, pixelSize);
        };

        // 绘制茎
        const drawStem = (x: number, y: number) => {
            ctx.fillStyle = '#228B22';
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(x, y + (i * pixelSize), pixelSize, pixelSize);
            }
        };

        // 绘制云朵
        const drawCloud = (x: number, y: number) => {
            ctx.fillStyle = '#FFFFFF';
            const cloudPixels = [
                {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0},
                {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}
            ];
            cloudPixels.forEach(pixel => {
                ctx.fillRect(
                    x + (pixel.x * pixelSize),
                    y + (pixel.y * pixelSize),
                    pixelSize,
                    pixelSize
                );
            });
        };

        // 绘制多朵花
        const flowers = [
            { x: 80, y: 250, color: '#FF69B4' },  // 粉色
            { x: 150, y: 270, color: '#FF0000' }, // 红色
            { x: 220, y: 260, color: '#9932CC' }, // 紫色
            { x: 290, y: 265, color: '#FFA500' }, // 橙色
            { x: 350, y: 255, color: '#4169E1' }, // 蓝色
        ];

        // 绘制树木
        drawTree(50, 280);
        drawTree(330, 270);

        // 绘制云朵
        drawCloud(60, 50);
        drawCloud(200, 40);
        drawCloud(320, 60);

        // 绘制小草
        for (let i = 0; i < 15; i++) {
            drawGrass(
                40 + Math.random() * (canvas.width - 80),
                canvas.height - 50 + Math.random() * 30
            );
        }

        // 绘制花朵
        flowers.forEach(flower => {
            drawStem(flower.x, flower.y);
            drawFlower(flower.x, flower.y - 20, flower.color);
        });

    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <canvas
                ref={canvasRef}
                style={{
                    border: '2px solid #333',
                    imageRendering: 'pixelated',
                    width: '400px',
                    height: '400px'
                }}
            />
        </div>
    );
};

export default PixelGarden; 
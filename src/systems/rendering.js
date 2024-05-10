import System from "./system.js";

class Rendering extends System {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  update(entities, deltaTime) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const tileSize = 20;
    const rows = Math.floor(this.canvas.height / tileSize);
    const cols = Math.floor(this.canvas.width / tileSize);

    this.drawChessboardBackground(
      this.context,
      rows,
      cols,
      tileSize,
      "#0f0f0f",
      "#141414"
    );

    const player = Array.from(entities.values()).find((entity) =>
      entity.hasTag("player")
    );

    if (player) {
      const scoreComponent = player.getComponent("Score");
      this.context.fillStyle = "#ffffff";
      this.context.font = "16px monospace";
      this.context.textAlign = "left";
      this.context.fillText(`Score: ${scoreComponent.score}`, 10, 20);
    }

    entities.forEach((entity) => {
      const shape = entity.getComponent("Shape");
      const transform = entity.getComponent("Transform");

      const { x, y } = transform.position;

      this.context.save();
      this.context.translate(x, y);

      const rotationSpeed = 170;
      transform.rotation += rotationSpeed * deltaTime;
      this.context.rotate((transform.rotation * Math.PI) / 180);

      if (entity.hasTag("player")) {
        this.drawPolygon(0, 0, shape.sides, shape.radius, shape.color, 1, null);
      } else {
        this.drawPolygon(
          0,
          0,
          shape.sides,
          shape.radius,
          "#ffffff",
          1,
          shape.color
        );
      }

      this.context.restore();
    });
  }

  drawChessboardBackground(context, rows, cols, tileSize, color1, color2) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isEven = (row + col) % 2 === 0;
        const color = isEven ? color1 : color2;

        context.fillStyle = color;

        const x = col * tileSize;
        const y = row * tileSize;

        context.fillRect(x, y, tileSize, tileSize);
      }
    }
  }

  drawPolygon(
    centerX,
    centerY,
    sides,
    radius,
    strokeColor,
    outlineThickness = 1,
    fillColor
  ) {
    if (sides < 3) {
      throw new Error("A polygon must have at least 3 sides.");
    }

    const angleStep = (2 * Math.PI) / sides;
    const startAngle = -Math.PI / 2;

    this.context.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = startAngle + i * angleStep;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
    }
    this.context.closePath();

    if (fillColor) {
      this.context.fillStyle = fillColor;
      this.context.fill();
    }

    this.context.strokeStyle = strokeColor;
    this.context.lineWidth = outlineThickness;
    this.context.stroke();
  }
}

export default Rendering;

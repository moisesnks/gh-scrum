function CircleProgress({ value, size = 100 }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            {/* Círculo gris de fondo */}
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="gray"
                strokeWidth="10"
            />
            {/* Círculo azul de progreso */}
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#09f"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={-offset}
                transform="rotate(-90 50 50)"
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="1.5rem"
                fill="#000"
            >
                {`${value}%`}
            </text>
        </svg>
    );
}

export default CircleProgress;
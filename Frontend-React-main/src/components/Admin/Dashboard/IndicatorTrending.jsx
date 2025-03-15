import { TrendingDown, TrendingUp } from "lucide-react";

const getStatus = (value) => (value > 0 ? "up" : value < 0 ? "down" : "neutral");

const statusColors = {
    up: "text-[#2E7D32]", // Hijau untuk naik
    down: "text-[#D02525]", // Merah untuk turun
    neutral: "text-[#727A90]", // Abu-abu untuk tidak ada perubahan
};

const statusIcons = {
    up: <TrendingUp width={16} color="#2E7D32" />, // Ikon naik
    down: <TrendingDown width={16} color="#D02525" />, // Ikon turun
    neutral: null, // Tidak ada ikon
};

const IndicatorTrending = ({ absolute, percentage }) => {
    const status = getStatus(absolute);
    return (
        <div className="flex flex-row items-center gap-2">
            <p className={`flex flex-row text-base font-bold ${statusColors[status]}`}>
                {percentage !== undefined ? `${percentage}%` : Math.abs(absolute)} {statusIcons[status]}
            </p>
            <p className="text-sm text-[#727A90]">
                {absolute > 0 ? "+" : "-"}
                {Math.abs(absolute)}
            </p>
        </div>
    );
};

export default IndicatorTrending;

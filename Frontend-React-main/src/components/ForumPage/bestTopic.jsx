import React from "react";
import commentIcon from "../../assets/png/coment.png";
import { Eye } from "lucide-react";
import { Link } from "react-router";
const BestTopic = ({ forums }) => {
    return (
        <div className="hidden sm:block w-full h-full sm:w-[477px] px-[38px] py-[35px] bg-white rounded-2xl p-[24px]">
        <h2 className="text-lg font-bold text-neutral-800 mb-4 border-b pb-4">Topik Terbaik Bulan Ini</h2>
        {forums.slice(0, 3).map((topic, index) => (
          <div key={index} className="mb-4 flex flex-col">
            <Link to={`/detail-forum/${topic.id}`}>
              <h3 className="text-[#0771a1] text-base font-bold">{topic.title}</h3>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <Eye className="w-4 h-4" />
              <span className="text-neutral-800 text-sm font-medium">{topic.views}</span>
            </div>
          </div>
        ))}
      </div>
    );
};

export default BestTopic;
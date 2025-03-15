import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const StickyCtaButton = () => {
    return (
        <div>
        <Link 
            to="/chat"
            className="fixed bottom-10 right-10 z-50 cursor-pointer"
        >
            <div className="relative">
                <div className="bg-green-500 text-white p-4 rounded-full rounded-br-none shadow-lg transition-all duration-300 hover:bg-green-600">
                    Start chat
                </div>
                <div className="absolute bottom-0 right-0 w-0 h-0 
                    border-l-[20px] border-l-transparent
                    border-b-[20px] border-b-green-500
                    transform rotate-180
                    transition-colors duration-300
                    group-hover:border-b-green-600">
                </div>
            </div>
        </Link>
        </div>
    );
};

export default StickyCtaButton;
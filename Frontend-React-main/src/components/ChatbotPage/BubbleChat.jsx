import React, { useEffect } from "react";
import { motion } from "framer-motion"; // Import framer motion
import Avatar from "../../assets/svg/avatar.svg";
import EcoAvatar from "../../assets/svg/eco-avatar.svg";
import Checklist from "../../assets/svg/checklist.svg";
import useUserStore, { loadUserData } from "../../stores/useUserStore";

const BubbleChat = ({ chat }) => {
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        loadUserData("/users/profile");
    }, []);

    // Variants for Framer Motion animations
    const chatAnimation = {
        hidden: { opacity: 0, y: 50 }, // Initial state (off-screen and transparent)
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // Final state
    };

    return (
        <>
            {chat.map((message, index) => (
                <motion.div
                    key={index}
                    className={`chat ${message.role === "user" ? "chat-end" : "chat-start"} pb-8`}
                    initial="hidden" // Initial animation state
                    animate="visible" // Final animation state
                    variants={chatAnimation} // Pass animation variants
                >
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Avatar"
                                src={message.role === "user" ? user.avatar_url : EcoAvatar}
                            />
                        </div>
                    </div>
                    <div
                        className={`chat-bubble ${
                            message.role === "user"
                                ? "bg-[#2E7D32] text-white font-bold"
                                : "bg-white text-[#1F2937]"
                        } font-nunito text-base max-w-[462px]`}
                    >
                        {message.message}
                    </div>
                    <div
                        className={`chat-footer pt-3 flex flex-row w-full items-start ${
                            message.role === "user" ? "justify-end" : "justify-start"
                        } gap-1`}
                    >
                        <div>
                            <img src={Checklist} alt="checklist" />
                        </div>
                        <p>Sent</p>
                    </div>
                </motion.div>
            ))}
        </>
    );
};

export default BubbleChat;

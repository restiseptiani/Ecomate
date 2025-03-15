import "preline";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import BubbleChat from "../components/ChatbotPage/BubbleChat";
import WelcomeSection from "../components/ChatbotPage/WelcomeSection";
import InputPrompt from "../components/ChatbotPage/InputPrompt";
import api from "../services/api";

const Chatbot = () => {
    const { register, handleSubmit, setValue, reset } = useForm({
        defaultValues: { message: "" },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [idChat, setIdChat] = useState("");
    const [chat, setChat] = useState(null);
    const bottom = useRef(null);

    const handleQuestionClick = (text) => {
        setValue("message", text);
    };

    const getChat = async (chatId) => {
        try {
            
            const response = await api.get(`/chatbots/${chatId}`);
            setChat(response.data.data);
            
        } catch (error) {
            console.log(error);
        }
    };

    const handlePrompt = async (data) => {
        try {
            setIsLoading(true);
            const response = await api.post("/chatbots", { message: data.message, id: idChat });

            if (!idChat) {
                const newChatId = response.data.data.chat_id;
                setIdChat(newChatId);
                await getChat(newChatId); // Fetch chat data immediately after receiving the ID
            } else {
                await getChat(idChat); // Fetch updated chat data for the existing ID
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        reset();
    };

    return (
        <div className="flex flex-col min-h-screen bg-secondary">
            <Navbar />

            <div className="pt-24 md:pt-40 flex flex-col w-full min-h-screen relative">
                {chat ? (
                    <div className="max-w-[1008px] w-full mx-auto px-7 pb-56" ref={bottom}>
                        <BubbleChat chat={chat} />
                    </div>
                ) : (
                    <WelcomeSection handleQuestionClick={handleQuestionClick} />
                )}

                {/* Input Text */}
                <div className="relative top-[100px]">
                <InputPrompt onSubmit={handleSubmit(handlePrompt)} register={register} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
};

export default Chatbot;

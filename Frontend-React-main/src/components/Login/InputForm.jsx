import AlertIcon from "../../assets/svg/alert-circle.svg";
import Eye from "../../assets/svg/eye.svg";
import EyeOff from "../../assets/svg/eye-off.svg";

const InputForm = ({ id, label, type, ps, error, placeholder, register, iconStart, showPassword, togglePassword, newClass, defaultValue, disabled }) => {
    const isPasswordField = id === "password-label";
    const finalIconEnd = error ? AlertIcon : isPasswordField && showPassword ? Eye : isPasswordField ? EyeOff : null;
    return (
        <div className="w-full relative mb-[17px]">
            <label htmlFor={id} className="block text-base font-bold mb-2 text-[#27272A]">
                {label}
            </label>
            <input
                type={type}
                id={id}
                defaultValue={defaultValue}
                disabled={disabled}
                className={`py-3 px-4 ${ps} block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm
    ${error ? "border-[#EF4444] focus:ring-[#EF4444]" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500"} ${newClass}`}
                placeholder={placeholder}
                {...register}
            />
            {error && <p className="text-[#EF4444] text-xs mt-2">{error}</p>}
            {iconStart && (
                <div className="absolute inset-y-14 start-0 flex items-center ps-4 ">
                    <img src={iconStart} alt="icon-start" />
                </div>
            )}
            {finalIconEnd && (
                <div className="absolute inset-y-14 right-3 transform -translate-y-1/2 flex items-center cursor-pointer" onClick={togglePassword}>
                    <img src={finalIconEnd} alt="icon-end" />
                </div>
            )}
        </div>
    );
};

export default InputForm;

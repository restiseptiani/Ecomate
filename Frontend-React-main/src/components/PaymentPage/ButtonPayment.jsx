import usePayment from "../../hooks/usePayment";

const ButtonPayment = ({ snapToken, checkedProducts, className, title, ...props }) => {
    const { handlePayment, isProcessing } = usePayment(snapToken, checkedProducts);
    return (
        <button className={className} onClick={handlePayment} disabled={isProcessing} {...props}>
            {isProcessing ? <span className="loading loading-spinner text-success"></span> : title}
        </button>
    );
};

export default ButtonPayment;

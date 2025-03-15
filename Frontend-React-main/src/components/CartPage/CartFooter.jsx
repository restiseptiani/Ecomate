import { formatToIDR } from "../../utils/function/formatToIdr";

const CartFooter = ({ products, totalPrice, selectAll, checkedProducts, handleSelectAll, handleCheckout, useCoin, setUseCoin, user, estimatedPrice }) => {
    const formatter = new Intl.NumberFormat("id-ID", { style: "decimal" });

    return (
        <div className="mt-[43px] rounded-xl mb-[68px] md:mb-[100px] md:mt-[140px] bg-[#FAFAFA] mx-10 min-[768px]:mx-4 xl:mx-5 xxl:mx-0 border border-[#E5E7EB] shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.05)]">
            <div className="flex flex-row justify-between items-center border-b border-[#E5E7EB] py-6 px-6 w-full">
                <h2 className="font-semibold text-sm text-gray-900 sm:text-base min-[1024px]:text-[20px] min-[1200px]:text-[24px]">Koin Ecomate</h2>
                <div className="flex flex-row gap-5 items-center">
                    <input
                        type="checkbox"
                        className={`toggle bg-white ${useCoin ? "[--tglbg:#2e7d32] border-[#2e7d32]" : "[--tglbg:#BEBEBE] border-[#BEBEBE]"} hover:bg-white`}
                        checked={useCoin}
                        onChange={() => setUseCoin((prev) => !prev)}
                    />
                    <p className="text-gray-700 text-sm sm:text-base font-semibold">{formatter.format(user?.coin || 0)} Koin</p>
                </div>
            </div>
            <div className="flex flex-row items-center px-3 py-[10px] min-[1024px]:px-6 min-[1200px]:py-5 w-full justify-between max-[570px]:flex-col max-[570px]:justify-normal max-[570px]:items-baseline">
                <div className="flex flex-row gap-3 items-center">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        className="checkbox w-[16px] h-[16px] min-[1024px]:w-[24px] min-[1024px]:h-[24px] rounded-[3px] border-2 border-[#2E7D32] [--chkbg:#2E7D32] [--chkfg:white] checked:border-[#2E7D32]"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    <p className="text-sm font-semibold text-[#262626] sm:text-base min-[1024px]:text-[20px] min-[1200px]:text-[24px]">Plih semua ({products?.length || 0})</p>
                </div>
                <div className="flex flex-row items-center gap-6 max-[570px]:w-full max-[570px]:justify-between">
                    <p className="text-sm font-semibold text-[#262626] sm:text-base min-[1024px]:text-[20px] min-[1200px]:text-[24px]">Total ({checkedProducts?.length} Produk) :</p>
                    <div className="flex flex-row gap-6 items-center">
                        <p className="text-sm font-semibold text-[#262626] sm:text-base min-[1024px]:text-[20px] min-[1200px]:text-[24px] min-[1300px]:text-[30px]">{formatToIDR(estimatedPrice)}</p>
                        <button
                            className="btn btn-success bg-[#3a7d2d] border-[#3a7d2d] !text-white max-[570px]:text-[12px] max-[570px]:p-[10px]"
                            onClick={handleCheckout}
                            disabled={checkedProducts?.length === 0}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartFooter;

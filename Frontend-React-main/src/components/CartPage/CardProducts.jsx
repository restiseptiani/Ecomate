import { Minus, Plus, Trash2 } from "lucide-react";
import { formatToIDR } from "../../utils/function/formatToIdr";

const CardProducts = ({ products, checkedProducts, quantities, handleCheckboxChange, handleQuantitiesChange, handleDeleteProduct }) => {
    return products
        ?.slice()
        .reverse()
        .map((product) => (
            <div className="my-4 bg-[#FAFAFA] mx-10 min-[768px]:mx-4 xl:mx-5 xxl:mx-0 rounded-xl border border-[#E5E7EB] shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.05)]" key={product.id}>
                <div className="p-3 min-[1200px]:p-6 min-[1024px]:px-6 flex flex-row items-center justify-between min-[1024px]:justify-normal">
                    <div className="flex flex-row items-center gap-2 min-[1024px]:flex-[1_36%] min-[1200px]:flex-[1_38%]">
                        <input
                            type="checkbox"
                            checked={checkedProducts.some((p) => p.product.product_id === product.product.product_id)}
                            className="checkbox w-[16px] h-[16px] min-[1024px]:w-[24px] min-[1024px]:h-[24px] rounded-[3px] border-2 border-[#2E7D32] [--chkbg:#2E7D32] [--chkfg:white] checked:border-[#2E7D32]"
                            onChange={(e) => {
                                handleCheckboxChange(e.target.checked, product);
                            }}
                        />

                        <div className="w-[54px] h-[54px] sm:w-[110px] sm:h-[110px]">
                            <img src={product.product.images[0].image_url} className="object-cover object-center w-full h-full rounded-md" alt="product-image" />
                        </div>
                        <div className="pl-1 md:pl-[40px]">
                            <h1 className="text-xs font-semibold text-[#262626] sm:text-base min-[1200px]:text-[24px] pb-2 sm:pb-3">{product.product.name}</h1>
                            <p className="text-[9px] font-semibold text-[#262626] sm:text-xs min-[1200px]:text-[18px]">{product.set}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 min-[1024px]:flex-[1_6%]">
                        <Minus color="#D4D4D4" className="w-3 sm:w-4 min-[1024px]:w-6 cursor-pointer" onClick={() => handleQuantitiesChange(product, -1)} />
                        <input
                            type="text"
                            value={quantities[product.product.product_id] || 1}
                            className="w-4 h-4 sm:w-8 sm:h-8 xl:w-8 xl:h-8 text-[12px] sm:text-base text-center xl:text-lg text-black focus:outline-none bg-transparent"
                            readOnly
                        />
                        <Plus color="black" className="w-3 sm:w-4 min-[1024px]:w-6 cursor-pointer" onClick={() => handleQuantitiesChange(product, 1)} />
                    </div>
                    <h1 className="text-[9px] text-[#262626] sm:text-base min-[1024px]:flex-[1_6%] xl:text-lg">{formatToIDR(product.product.price)}</h1>
                    <Trash2 color="#A51D1D" width={16} className="sm:w-5 min-[1024px]:w-6 cursor-pointer" onClick={() => handleDeleteProduct(product.product.product_id)} />
                </div>
            </div>
        ));
};

export default CardProducts;

import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { formatToIDR } from "../../utils/function/formatToIdr";
import ButtonPayment from "./ButtonPayment";

const DetailTransaction = ({ products }) => {
    const [filteredCheckout, setFilteredCheckout] = useState([]);
    const location = useLocation();
    const { cart_ids, transaction } = location.state || {};

    useEffect(() => {
        if (products && cart_ids?.length > 0) {
            const filteredCheckout = products.filter((product) => cart_ids.includes(product.id));
            setFilteredCheckout(filteredCheckout);
        }
    }, [products]);

    return (
        <div className="flex-[1_50%]">
            <h1 className="mb-12 text-3xl font-bold">Ringkasan Orderan</h1>
            <div className="bg-white rounded-xl border border-[#E5E7EB]">
                <div className="px-14 py-8">
                    {/* Card Product */}
                    {filteredCheckout?.map((product) => (
                        <div className="flex flex-col gap-6 items-center border-b border-[#E5E7EB] py-[22px] lg:flex-row lg:gap-0" key={product.id}>
                            <div className="flex flex-row items-center gap-6 w-full flex-[1_80%] ">
                                <img src={product?.product.images[0].image_url} className="w-[110px] h-[110px] object-cover object-center rounded-md" alt="product-image" />
                                <h1 className="text-2xl font-normal text-[#262626] lg:text-lg min-[1200px]:text-xl min-[1313px]:text-2xl">{product.product.name}</h1>
                            </div>
                            <div className="flex flex-row max-lg:w-full justify-between flex-[1_50%] max-[1300px]:flex-[1_40%] max-lg:flex-[1_35%]">
                                <h1 className="text-2xl font-normal text-[#3f2a2a] lg:text-lg min-[1200px]:text-xl min-[1313px]:text-2xl">x{product.quantity}</h1>
                                <h1 className="text-2xl font-normal text-[#262626] lg:text-lg min-[1200px]:text-xl min-[1313px]:text-2xl">{formatToIDR(product.product.price * product.quantity)}</h1>
                            </div>
                        </div>
                    ))}
                    {/* Detail Items */}
                    <div>
                        {/* Subtotal */}
                        <div className="flex flex-row justify-between w-full border-b border-[#E5E7EB] py-4">
                            <h1 className="text-2xl font-semibold text-[#262626]">Subtotal</h1>
                            <h1 className="text-2xl font-bold text-[#262626]">{formatToIDR(transaction?.amount)}</h1>
                        </div>

                        <div className="flex flex-row justify-between items-center border-b border-[#E5E7EB] py-4">
                            <h2 className="font-bold text-gray-900 text-2xl">Total</h2>
                            <h2 className="font-bold text-gray-900 text-2xl">{formatToIDR(transaction?.amount)}</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* Button pay now */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 mt-8">
                <ButtonPayment
                    snapToken={transaction?.snap_token}
                    checkedProducts={filteredCheckout}
                    title="Bayar Sekarang"
                    className="btn btn-success !text-white bg-[#2e7d32] border-[#2e7d32] w-full text-xl font-bold"
                />
            </div>
        </div>
    );
};

export default DetailTransaction;

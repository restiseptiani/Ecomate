const CartHeader = () => {
    return (
        <div className="mt-10 rounded-xl mb-4 bg-[#FAFAFA] mx-10 min-[768px]:mx-4 xl:mx-5 xxl:mx-0 border border-[#E5E7EB] shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.05)]">
            <div className="flex flex-row items-center px-3 py-[10px] min-[1024px]:px-6 min-[1200px]:py-5">
                <p className="text-sm font-semibold text-[#262626] flex-[1_18%] min-[520px]:flex-[1_50%] sm:text-base min-[1200px]:text-[24px]">Produk</p>
                <p className="text-sm font-semibold text-[#262626] flex-[1_50%] min-[520px]:hidden min-[1200px]:text-[24px]">Nama Produk</p>
                <p className="text-sm font-semibold text-[#262626] flex-[1_50%] hidden min-[520px]:block min-[600px]:flex-[1_26%] sm:text-base min-[1024px]:flex-[1_20%] min-[1200px]:text-[24px]">
                    Jumlah Barang
                </p>
                <p className="text-sm font-semibold text-[#262626] flex-[1_50%] hidden min-[600px]:block min-[600px]:flex-[1_30%] sm:text-base min-[1024px]:flex-[1_20%] min-[1200px]:text-[24px]">
                    Harga Satuan
                </p>
                <p className="text-sm font-semibold text-[#262626] sm:text-base min-[1200px]:text-[24px]">Aksi</p>
            </div>
        </div>
    );
};

export default CartHeader;

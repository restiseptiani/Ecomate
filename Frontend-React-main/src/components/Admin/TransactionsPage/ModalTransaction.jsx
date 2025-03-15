import imageBg from "../../../assets/jpg/user.jpg";
import { formatToIDR } from "../../../utils/function/formatToIdr";
import { truncateText } from "../../../utils/function/truncateText";
const ModalTransaction = ({ transaction, users }) => {
    const user = users?.find((u) => u.email === transaction.email);

    return (
        <dialog id="my_modal_15" className="modal">
            <div className="modal-box  w-11/12 max-w-2xl">
                <div className="p-8 flex flex-row justify-center">
                    <div className={`border border-[#E5E7EB] rounded-2xl ${imageBg || user?.avatar_url ? "w-[120px] h-[120px] object-cover rounded-2xl" : "p-8"}`}>
                        <img src={user?.avatar_url ? user?.avatar_url : imageBg} className="object-cover object-top rounded-2xl w-full h-full" alt="Preview" />
                    </div>

                    <div className="grid grid-cols-2 bg-white p-2 border border-[#E5E7EB] rounded-lg max-w-sm mx-auto w-full">
                        {/* Block 1 */}
                        <div className="flex flex-col gap-2 py-5 border-b border-[#E5E7EB] border-r">
                            <h1 className="text-base font-bold text-[#404040] px-2">{transaction?.name}</h1>
                            <p className="text-sm font-semibold text-[#737373] px-2">{transaction?.email}</p>
                        </div>

                        {/* Block 2 */}
                        <div className="flex flex-col gap-2 py-5 border-b border-[#E5E7EB]">
                            <h1 className="text-base font-bold text-[#404040] px-4">Pembayaran</h1>
                            <p className="text-sm font-semibold text-[#737373] px-4">{transaction?.payment_method === "bank_transfer" ? "Bank Transfer" : transaction?.payment_method}</p>
                        </div>

                        {/* Block 3 */}
                        <div className="flex flex-col gap-2 py-5 border-r border-[#E5E7EB]">
                            <h1 className="text-base font-bold text-[#404040] px-2">Tanggal</h1>
                            <p className="text-sm font-semibold text-[#737373] px-2">{new Date(transaction.created_at).toLocaleDateString()}</p>
                        </div>

                        {/* Block 4 */}
                        <div className="flex flex-col gap-2 py-5 pl-4">
                            <h1 className="text-base font-bold text-[#404040]">Status</h1>
                            <p
                                className={`text-sm font-semibold text-[#00b894] bg-[#dff9fb] py-1 px-2 rounded-xl w-fit ${
                                    transaction?.status === "pending"
                                        ? "text-[#019BF4] bg-[#E6F5FE] border-2 border-[#B0E0FC]"
                                        : transaction?.status === "expire"
                                        ? "text-[#F05D3D] bg-[#feefec] border-2 border-[#FACDC3]"
                                        : "text-[#009499] bg-[#e5f4f5] border-2 border-[#B0DEDF]"
                                }`}
                            >
                                {transaction?.status ? transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) : "Unknown"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <h1 className="font-bold text-base text-[#1F2937]">Total Transaksi</h1>
                    <h1 className="font-bold text-base text-[#1F2937]">{formatToIDR(transaction?.total_transaction)}</h1>
                </div>
                <div className="py-2 px-16 flex flex-row justify-between bg-[#2E7D32] rounded-lg mt-4 mb-2">
                    <h1 className="font-bold text-base text-[#FAFAFA]">Nama Produk</h1>
                    <h1 className="font-bold text-base text-[#FAFAFA]">Jumlah</h1>
                    <h1 className="font-bold text-base text-[#FAFAFA]">Harga</h1>
                </div>

                {transaction?.details?.map((product, index) => (
                    <div className="flex flex-row items-center justify-between p-2 border border-[#E5E7EB] rounded-xl mb-2" key={index}>
                        <div className="flex flex-row items-center gap-3">
                            <div className={`border border-[#E5E7EB] rounded-2xl ${product.product_image ? "w-[60px] h-[60px] object-cover rounded-2xl" : "p-8"}`}>
                                <img src={product.product_image} className="object-cover object-top rounded-lg w-full h-full" alt="Preview" />
                            </div>
                            <h1 className="font-semibold text-base text-[#1F2937] cursor-pointer" title={product.product_name}>
                                {product.product_name}
                            </h1>
                        </div>
                        <h1 className="font-semibold text-base text-[#1F2937]">{product.product_quantity}</h1>
                        <h1 className="font-semibold text-base text-[#1F2937]">{formatToIDR(product.price)}</h1>
                    </div>
                ))}
                <div className="text-end mt-6">
                    <button className="btn btn-success !text-white !bg-[#2E7D32] border-[#2E7D32]" onClick={() => document.getElementById("my_modal_15").close()}>
                        Tutup
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalTransaction;

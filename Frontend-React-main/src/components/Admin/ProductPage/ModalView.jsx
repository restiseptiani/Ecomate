import imageBg from "../../../assets/svg/admin-icon/image.svg";
import InputForm from "../../Login/InputForm";

const ModalView = ({ selectedProduct }) => {
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <div className="flex flex-row items-center gap-[75px]">
                    <h1 className="font-bold text-[#404040] text-base">Foto Produk</h1>
                    <div className="flex flex-row items-center gap-8 ">
                        <div className={`border border-[#E5E7EB] rounded-2xl ${!selectedProduct?.images[0].image_url && "p-8"}`}>
                            <img
                                src={selectedProduct?.images[0].image_url ? selectedProduct?.images[0].image_url : imageBg}
                                className={selectedProduct?.images[0].image_url && "w-[120px] h-[120px] object-cover rounded-2xl"}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Nama Produk</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedProduct?.name} disabled={true} placeholder="Nama Produk" />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Kategori Produk</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedProduct?.category_product} disabled={true} placeholder="Nama Produk" />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Kategori Efek</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedProduct?.category_impact[0]?.impact_category.name} disabled={true} placeholder="Kategori Impact" />
                </div>
                <div className="flex flex-row items-center justify-end mb-4">
                    <div className="max-w-[300px] w-full">
                        <InputForm id="name-label" type="text" defaultValue={selectedProduct?.category_impact[1]?.impact_category.name} disabled={true} placeholder="Kategori Impact" />
                    </div>
                </div>

                <div className="flex flex-row items-center justify-end gap-9 mb-4">
                    <h1 className="font-bold text-[#404040] text-base">Deskripsi Produk</h1>
                    <textarea className={`textarea textarea-bordered flex-[1_50%]`} disabled placeholder="Deskripsi Produk" defaultValue={selectedProduct?.description}></textarea>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Harga Produk</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedProduct?.price} disabled={true} placeholder="Nama Produk" />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Koin Produk</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedProduct?.coin} disabled={true} placeholder="Nama Produk" />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Stok</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedProduct?.stock} disabled={true} placeholder="Nama Produk" />
                </div>
                <div className="flex flex-row items-center justify-end gap-4 mb-4">
                    <button
                        className="btn btn-outline btn-success !text-[#2E7D32] border border-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white"
                        onClick={() => document.getElementById("my_modal_1").close()}
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalView;

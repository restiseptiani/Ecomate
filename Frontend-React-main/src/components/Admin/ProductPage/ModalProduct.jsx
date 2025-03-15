import { Plus, Upload } from "lucide-react";
import imageBg from "../../../assets/svg/admin-icon/image.svg";
import InputForm from "../../Login/InputForm";
import useProductForm from "../../../hooks/useProductForm";

const ModalProduct = ({fetchProduct}) => {
    const { register, handleSubmit, errors, impacts, imagePreview, handleImageChange, loading, handleModal, closeModal, onSubmit } = useProductForm(fetchProduct);

    return (
        <>
            <button className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32]" onClick={handleModal}>
                <Plus width={16} />
                Tambah Produk
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="font-bold text-[#404040] text-base">Foto Produk</h1>
                        <div className="flex flex-row items-center gap-8 ">
                            <div className={`border border-[#E5E7EB] rounded-2xl ${imagePreview ? "w-[120px] h-[120px] object-cover rounded-2xl" : "p-8"}`}>
                                <img src={imagePreview ? imagePreview : imageBg} className="object-cover rounded-2xl w-full h-full" alt="Preview" />
                            </div>
                            <div>
                                <label htmlFor="file-upload" className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32] flex items-center gap-2">
                                    <Upload />
                                    Tambah Foto
                                </label>
                                <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Nama Produk</h1>
                        <InputForm
                            id="name-label"
                            type="text"
                            register={register("name", {
                                required: "Silahkan masukkan nama product yang valid.",
                            })}
                            error={errors.name?.message}
                            placeholder="Nama Produk"
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between mb-4">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Kategori Produk</h1>
                        <select
                            className="select w-full max-w-xs border border-[#E5E7EB]"
                            id="category-label"
                            defaultValue=""
                            {...register("category_product", {
                                required: "Silakan pilih kategori produk.",
                            })}
                        >
                            <option disabled value="">
                                Pilih Kategori
                            </option>
                            <option value="Baju">Baju</option>
                            <option value="Sepatu">Sepatu</option>
                            <option value="Sandal">Sandal</option>
                            <option value="Perabot">Perabot</option>
                            <option value="Tas">Tas</option>
                            <option value="Aksesoris">Aksesoris</option>
                        </select>

                        {errors.category && <p className="text-[#EF4444] text-xs mt-2">{errors.category.message}</p>}
                    </div>

                    <div className="flex flex-row items-center justify-between mb-4">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Kategori Efek</h1>
                        <select
                            className="select w-full max-w-xs border border-slate-300"
                            id="category-impact"
                            defaultValue=""
                            {...register("category_impact", {
                                required: "Silakan pilih impact yang valid.",
                            })}
                        >
                            <option disabled value="">
                                Dampak Terhadap Lingkungan
                            </option>
                            {impacts.map((impact) => (
                                <option key={impact.id} value={impact.id}>
                                    {impact.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-row items-center justify-end mb-4">
                        <select className="select w-full max-w-[300px] border border-slate-300" defaultValue="" id="category-impact" {...register("category_impact_2")}>
                            <option disabled value="">
                                Dampak Terhadap Lingkungan
                            </option>
                            {impacts.map((impact) => (
                                <option key={impact.id} value={impact.id}>
                                    {impact.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-9 mb-4">
                        <h1 className="font-bold text-[#404040] text-base">Deskripsi Produk</h1>
                        <textarea
                            className={`textarea textarea-bordered flex-[1_50%] ${
                                errors.description ? "border-[#EF4444] focus:ring-[#EF4444]" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500"
                            }`}
                            placeholder="Deskripsi Produk"
                            {...register("description", {
                                required: "Silahkan masukkan Deskripsi yang valid.",
                            })}
                        ></textarea>
                    </div>
                    {errors.description && <p className="text-[#EF4444] text-xs mt-2 text-end">{errors.description.message}</p>}
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Harga Produk</h1>
                        <InputForm
                            id="price-label"
                            type="number"
                            register={register("price", {
                                required: "Silahkan masukkan price yang valid.",
                            })}
                            error={errors.price?.message}
                            placeholder="Harga Produk"
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Koin Produk</h1>
                        <InputForm
                            id="coin-label"
                            type="number"
                            register={register("coin", {
                                required: "Silahkan masukkan coin yang valid.",
                            })}
                            error={errors.stock?.message}
                            placeholder="Koin yang didapat ketika membeli produk."
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Stok</h1>
                        <InputForm
                            id="stock-label"
                            type="number"
                            register={register("stock", {
                                required: "Silahkan masukkan stock yang valid.",
                            })}
                            error={errors.stock?.message}
                            placeholder="Stok Produk"
                        />
                    </div>
                    <div className="flex flex-row items-center justify-end gap-4 mb-4">
                        <span className="btn btn-outline btn-success !text-[#2E7D32] border border-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white" disabled={loading} onClick={closeModal}>
                            Batalkan
                        </span>
                        <button type="submit" className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32]" disabled={loading}>
                            {loading ? <span className="loading loading-spinner text-success"></span> : "Tambah Produk"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default ModalProduct;

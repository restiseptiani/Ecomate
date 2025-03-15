import { useForm } from "react-hook-form";
import InputForm from "../Login/InputForm";

const InputPayment = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    return (
        <div className="flex-[1_50%]">
            <h1 className="mb-12 text-3xl font-bold">Detail Tagihan</h1>
            <div className="bg-white w-full p-8 rounded-xl border border-[#E5E7EB] shadow-sm">
                <InputForm
                    id="nama-label"
                    label="Nama *"
                    type="text"
                    register={register("nama", {
                        required: "Silahkan masukkan nama yang valid.",
                    })}
                    error={errors.nama?.message}
                    placeholder="Masukkan nama"
                />
                <InputForm
                    id="alamat-label"
                    label="Alamat *"
                    type="text"
                    register={register("alamat", {
                        required: "Silahkan masukkan alamat yang valid.",
                    })}
                    error={errors.alamat?.message}
                    placeholder="Masukkan nama alamat"
                />
                <InputForm
                    id="kota-label"
                    label="Kota/Kabupaten *"
                    type="text"
                    register={register("kota", {
                        required: "Silahkan masukkan Kota/Kabupaten yang valid.",
                    })}
                    error={errors.kota?.message}
                    placeholder="Masukkan nama Kota/Kabupaten"
                />
                <InputForm
                    id="provinsi-label"
                    label="Provinsi *"
                    type="text"
                    register={register("provinsi", {
                        required: "Silahkan masukkan Provinsi yang valid.",
                    })}
                    error={errors.provinsi?.message}
                    placeholder="Masukkan nama Provinsi"
                />
                <InputForm
                    id="kecamatan-label"
                    label="Kecamatan *"
                    type="text"
                    register={register("kecamatan", {
                        required: "Silahkan masukkan Kecamatan yang valid.",
                    })}
                    error={errors.kecamatan?.message}
                    placeholder="Masukkan nama Kecamatan"
                />
                <InputForm
                    id="kelurahan-label"
                    label="Kelurahan *"
                    type="text"
                    register={register("kelurahan", {
                        required: "Silahkan masukkan Kelurahan yang valid.",
                    })}
                    error={errors.kelurahan?.message}
                    placeholder="Masukkan nama Kelurahan"
                />
                <InputForm
                    id="pos-label"
                    label="Kode Pos *"
                    type="text"
                    register={register("pos", {
                        required: "Silahkan masukkan Kode Pos yang valid.",
                    })}
                    error={errors.pos?.message}
                    placeholder="Masukkan nama Kode Pos"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-2 w-full tablet:mb-0  mobile:mb-[17px]">
                    <div className=" tablet:mb-0 mobilelg:mb-0 relative">
                        <InputForm
                            id="notelp-label"
                            label="No Telepon *"
                            type="number"
                            placeholder="Masukkan no telepon"
                            register={register("notelp", {
                                required: "Silahkan masukkan no telepon yang valid.",
                                validate: {
                                    length: (value) => value.length === 13 || "Nomor telepon harus 12 digit.",
                                },
                            })}
                            error={errors.notelp?.message}
                        />
                    </div>
                    <div className="relative">
                        <InputForm
                            id="email-label"
                            label="Email"
                            type="email"
                            register={register("email", {
                                required: "Silahkan masukkan email yang valid.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Format email tidak valid.",
                                },
                            })}
                            error={errors.email?.message}
                            placeholder="Masukkan alamat email"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputPayment;

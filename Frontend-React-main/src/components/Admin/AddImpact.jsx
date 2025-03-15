import "preline";
import InputForm from "../Login/InputForm";
import { useForm } from "react-hook-form";
import api from "../../services/api";

const AddImpact = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            data.impact_point = parseInt(data.impact_point, 10);

            const response = await api.post("/impacts", data);
            console.log(response);
            
        } catch (error) {
            console.log(error);
        }

        console.log(data);
    };

    return (
        <div>
            <h1>Upload Impact Dulu ges</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    id="impact-label"
                    label="Nama Impact"
                    type="text"
                    register={register("name", {
                        required: "Silahkan masukkan impact yang valid.",
                    })}
                    error={errors.name?.message}
                    placeholder="Nama Impact"
                />

                <InputForm
                    id="point-label"
                    label="Impact Point"
                    type="number"
                    register={register("impact_point", {
                        required: "Silahkan masukkan impact_point yang valid.",
                    })}
                    error={errors.impact_point?.message}
                    placeholder="Impact Point"
                />

                <InputForm
                    id="desc-label"
                    label="Description"
                    type="text"
                    register={register("description", {
                        required: "Silahkan masukkan impact_point yang valid.",
                    })}
                    error={errors.description?.message}
                    placeholder="Description"
                />

                <button type="submit" className="btn btn-success">
                    Simpan Impact
                </button>
            </form>
        </div>
    );
};

export default AddImpact;

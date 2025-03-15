import AddImpact from "../../components/Admin/AddImpact";
import AddProducts from "../../components/Admin/AddProducts";

const AddProductPage = () => {
    return (
        <div className="min-h-screen flex flex-row justify-center items-center  gap-40">
            <AddImpact />
            <AddProducts />
        </div>
    );
};

export default AddProductPage;

import React, { useState } from "react";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import { useForm } from "../../hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../utils/validators";
import close from "../../assets/close.png";

const AdminOfferAdd = ({ toogle, add }) => {
    const [formState, inputHandler] = useForm(
        {
            offer_name: { value: "", isValid: false },
            city: { value: "", isValid: false },
            country: { value: "", isValid: false },
            continent: { value: "", isValid: false },
            transport: { value: "", isValid: false },
            departure_time: { value: "", isValid: false },
            arrival_time: { value: "", isValid: false },
            apartment: { value: "", isValid: false },
            apartment_name: { value: "", isValid: false },
            accomodation: { value: "", isValid: false },
            stars: { value: "", isValid: false },
            price: { value: "", isValid: false },
            has_tv: { value: "0", isValid: true },
            has_ac: { value: "0", isValid: true },
            has_internet: { value: "0", isValid: true },
            has_fridge: { value: "0", isValid: true },
            available: { value: "1", isValid: true },
        },
        false
    );

    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("continent", formState.inputs.continent.value);
        formData.append("country", formState.inputs.country.value);
        formData.append("city", formState.inputs.city.value);
        formData.append("departure_time", formState.inputs.departure_time.value);
        formData.append("arrival_time", formState.inputs.arrival_time.value);
        formData.append("transport", formState.inputs.transport.value);
        formData.append("apartment", formState.inputs.apartment.value);
        formData.append("apartment_name", formState.inputs.apartment_name.value);
        formData.append("accomodation", formState.inputs.accomodation.value);
        formData.append("stars", formState.inputs.stars.value);
        formData.append("price", formState.inputs.price.value);
        formData.append("has_tv", formState.inputs.has_tv.value);
        formData.append("has_ac", formState.inputs.has_ac.value);
        formData.append("has_internet", formState.inputs.has_internet.value);
        formData.append("has_fridge", formState.inputs.has_fridge.value);
        formData.append("available", formState.inputs.available.value);
        if (image) formData.append("destination_image", image);

        add(formData); // <-- kirim sebagai FormData
    };

    return (
        <div className="relative w-[95%] h-[95%] bg-[#f0f2f3] p-[2rem] overflow-y-auto">
            <h1 className=" text-xl text-black mb-2 font-bold">
                Add offer informations
            </h1>
            <button
                className="absolute right-[40px] top-[40px] w-[30px] h-[30px] cursor-pointer"
                onClick={toogle}
            >
                <img src={close} alt="close" />
            </button>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 min-[1400px]:grid-cols-3 gap-[1rem]"
                encType="multipart/form-data"
            >
                {Object.keys(formState.inputs).map((key) =>
                    key !== "available" ? (
                        <Input
                            key={key}
                            id={key}
                            label={key}
                            type={
                                key.includes("time")
                                    ? "datetime-local"
                                    : key.startsWith("has_")
                                    ? "number"
                                    : "text"
                            }
                            initialValue={formState.inputs[key].value}
                            initialValid={formState.inputs[key].isValid}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={`Enter valid ${key}!`}
                            onInput={inputHandler}
                        />
                    ) : (
                        <div key={key}>
                            <label className="text-sm font-medium">Available</label>
                            <select
                                value={formState.inputs[key].value}
                                onChange={(e) =>
                                    inputHandler(key, e.target.value, true)
                                }
                                className="w-full border border-gray-400 p-2 rounded"
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    )
                )}

                {/* Gambar */}
                <div>
                    <label className="text-sm font-medium">Destination Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full border border-gray-400 p-2 rounded"
                    />
                </div>

                <div className="max-h-[41.6px] mt-[31px]">
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </div>
    );
};

export default AdminOfferAdd;

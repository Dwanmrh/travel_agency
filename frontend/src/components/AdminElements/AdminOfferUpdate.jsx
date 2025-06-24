import React, { useEffect, useState } from "react";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import { useForm } from "../../hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../utils/validators";
import back from "../../assets/back.png";

const AdminOfferUpdate = ({ offer, toogle, update }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
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
            has_tv: { value: "", isValid: false },
            has_ac: { value: "", isValid: false },
            has_internet: { value: "", isValid: false },
            has_fridge: { value: "", isValid: false },
        },
        false
    );

    useEffect(() => {
        const formatDate = (dateStr) =>
            new Date(dateStr).toISOString().split("T")[0];

        setFormData(
            {
                offer_name: { value: offer.offer_name, isValid: true },
                city: { value: offer.city, isValid: true },
                country: { value: offer.country, isValid: true },
                continent: { value: offer.continent, isValid: true },
                transport: { value: offer.transport, isValid: true },
                departure_time: {
                    value: formatDate(offer.departure_time),
                    isValid: true,
                },
                arrival_time: {
                    value: formatDate(offer.arrival_time),
                    isValid: true,
                },
                apartment: { value: offer.apartment, isValid: true },
                apartment_name: {
                    value: offer.apartment_name,
                    isValid: true,
                },
                accomodation: { value: offer.accomodation, isValid: true },
                stars: { value: offer.stars, isValid: true },
                price: { value: offer.price, isValid: true },
                has_tv: { value: offer.has_tv ? "1" : "0", isValid: true },
                has_ac: { value: offer.has_ac ? "1" : "0", isValid: true },
                has_internet: {
                    value: offer.has_internet ? "1" : "0",
                    isValid: true,
                },
                has_fridge: { value: offer.has_fridge ? "1" : "0", isValid: true },
            },
            true
        );
        setIsLoading(false);
    }, []);

    const fixDateTime = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
        )}-${String(date.getDate()).padStart(2, "0")} 00:00:00`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id: offer.id,
            offer_name: formState.inputs.offer_name.value,
            city: formState.inputs.city.value,
            country: formState.inputs.country.value,
            continent: formState.inputs.continent.value,
            transport: formState.inputs.transport.value,
            departure_time: fixDateTime(formState.inputs.departure_time.value),
            arrival_time: fixDateTime(formState.inputs.arrival_time.value),
            apartment: formState.inputs.apartment.value,
            apartment_name: formState.inputs.apartment_name.value,
            accomodation: formState.inputs.accomodation.value,
            stars: formState.inputs.stars.value,
            price: formState.inputs.price.value,
            has_tv: formState.inputs.has_tv.value,
            has_ac: formState.inputs.has_ac.value,
            has_internet: formState.inputs.has_internet.value,
            has_fridge: formState.inputs.has_fridge.value,
            destination_image: offer.destination_image,
        };

        update(data);
    };

    if (isLoading) return <div>Učitava se...</div>;

    return (
        <div className="relative">
            <h1 className="text-xl text-black mb-2 font-bold">
                {`Reserve your trip to ${offer.city}`}
            </h1>
            <button
                className="absolute right-[40px] top-0 w-[30px] h-[30px] cursor-pointer"
                onClick={toogle}
            >
                <img src={back} alt="back" />
            </button>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 min-[1400px]:grid-cols-3 gap-[1rem]"
            >
                {Object.keys(formState.inputs).map((key) => (
                    <Input
                        key={key}
                        id={key}
                        label={key}
                        type={key.includes("time") ? "date" : "text"}
                        initialValue={formState.inputs[key].value}
                        initialValid={formState.inputs[key].isValid}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText={`Enter valid ${key}!`}
                        onInput={inputHandler}
                    />
                ))}
                <Button type="submit">Update</Button>
            </form>
        </div>
    );
};

export default AdminOfferUpdate;

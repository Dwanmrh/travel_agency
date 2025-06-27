import React from "react";
import Input from "./FormElements/Input";
import { useForm } from "../hooks/useForm";
import Button from "./FormElements/Button";
import { OfferService } from "../services/OfferService";

function Search({ searchOffers }) {
    const [formState, inputHandler] = useForm(
        {
            city: { value: "", isValid: true },
            country: { value: "", isValid: true },
            continent: { value: "", isValid: true },
            transport: { value: "", isValid: true },
            departure_time: { value: "", isValid: true },
            arrival_time: { value: "", isValid: true },
        },
        false
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            city: formState.inputs.city.value,
            country: formState.inputs.country.value,
            continent: formState.inputs.continent.value,
            transport: formState.inputs.transport.value,
            departure_time: formState.inputs.departure_time.value,
            arrival_time: formState.inputs.arrival_time.value,
        };

        const response = await OfferService.searchOffers(data);
        searchOffers(response.data);
        console.log(response.data);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <Input
                    id="continent"
                    label="Continent"
                    type="text"
                    initialValue={formState.inputs.continent.value}
                    initialValid={formState.inputs.continent.isValid}
                    validators={[]}
                    onInput={inputHandler}
                />
                <Input
                    id="country"
                    label="Country"
                    type="text"
                    initialValue={formState.inputs.country.value}
                    initialValid={formState.inputs.country.isValid}
                    validators={[]}
                    onInput={inputHandler}
                />
                <Input
                    id="city"
                    label="City"
                    type="text"
                    initialValue={formState.inputs.city.value}
                    initialValid={formState.inputs.city.isValid}
                    validators={[]}
                    onInput={inputHandler}
                />
                <Input
                    id="transport"
                    label="Transport"
                    type="text"
                    initialValue={formState.inputs.transport.value}
                    initialValid={formState.inputs.transport.isValid}
                    validators={[]}
                    onInput={inputHandler}
                />
                <Input
                    id="departure_time"
                    label="Departure"
                    type="date"
                    initialValue={formState.inputs.departure_time.value}
                    initialValid={formState.inputs.departure_time.isValid}
                    validators={[]}
                    onInput={inputHandler}
                />
                <Input
                    id="arrival_time"
                    label="Arrival"
                    type="date"
                    initialValue={formState.inputs.arrival_time.value}
                    initialValid={formState.inputs.arrival_time.isValid}
                    validators={[]}
                    onInput={inputHandler}
                />

                <div className="flex items-end">
                    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg shadow-md transition">
                        Search
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Search;

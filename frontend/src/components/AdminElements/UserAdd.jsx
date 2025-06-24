import React from "react";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import { useForm } from "../../hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../utils/validators";
import { UserService } from "../../services/UserService";
import { toast } from "react-toastify";

function UserAdd({ closeM, onAdd }) {
    const [formState, inputHandler] = useForm(
        {
            email: { value: "", isValid: false },
            name: { value: "", isValid: false },
            surname: { value: "", isValid: false },
            phone_number: { value: "", isValid: false },
            password: { value: "", isValid: false },
        },
        false
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: formState.inputs.email.value,
            name: formState.inputs.name.value,
            surname: formState.inputs.surname.value,
            phone_number: formState.inputs.phone_number.value,
            password: formState.inputs.password.value,
        };

        const response = await UserService.addUser(data);
        if (response) {
            toast.success("Successfully added user!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            onAdd(); // fetch ulang user list
            closeM(); // tutup modal
        } else {
            toast.error("Error! Change your inputs!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <div className="w-[40%] h-[60%] bg-white rounded-md min-h-[590px]">
            <form onSubmit={handleSubmit} className="gap-[1rem] p-12 mx-auto">
                <Input
                    id="email"
                    label="email"
                    type="text"
                    initialValue=""
                    initialValid={false}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Enter valid email!"
                    onInput={inputHandler}
                />
                <Input
                    id="name"
                    label="name"
                    type="text"
                    initialValue=""
                    initialValid={false}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Enter your name!"
                    onInput={inputHandler}
                />
                <Input
                    id="surname"
                    label="surname"
                    type="text"
                    initialValue=""
                    initialValid={false}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Enter your surname!"
                    onInput={inputHandler}
                />
                <Input
                    id="phone_number"
                    label="phone_number"
                    type="text"
                    initialValue=""
                    initialValid={false}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Enter phone number!"
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    label="password"
                    type="password"
                    initialValue=""
                    initialValid={false}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Enter password!"
                    onInput={inputHandler}
                />
                <div className="mt-8">
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </div>
    );
}

export default UserAdd;

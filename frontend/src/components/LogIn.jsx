import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { UserService } from "../services/UserService";
import Button from "./FormElements/Button";
import Input from "./FormElements/Input";
import { VALIDATOR_REQUIRE } from "../utils/validators";
import { useNavigate } from "react-router-dom";
import { SessionService } from "../services/SessionService";
import showImage from "../assets/show.png";
import hideImage from "../assets/hide.png";
import { toast } from "react-toastify";

function LogIn({ closeM }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formState, inputHandler] = useForm(
        {
            email: { value: "", isValid: false },
            password: { value: "", isValid: false },
        },
        false
    );

    const toggleShow = () => setShow(!show);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        };

        const response = await UserService.logIn(data);

        if (response) {
            const user = await UserService.getUser(data);
            SessionService.saveSession(user);

            if (user[0].role === "admin" || user[0].role === "staff") {
                navigate("/adminOffers");
            } else if (user[0].role === "user") {
                navigate("/offers");
            } else {
                toast.error("Unknown role. Access denied.");
                return;
            }

            toast.success("Successfully logged in!", {
                position: toast.POSITION.TOP_RIGHT,
            });

            closeM?.();
        } else {
            toast.error("Login gagal! Periksa email atau password.", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10 relative">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    id="email"
                    label="Email"
                    type="text"
                    initialValue={formState.inputs.email.value}
                    initialValid={formState.inputs.email.isValid}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter your email."
                    onInput={inputHandler}
                />

                <div className="relative">
                    <Input
                        id="password"
                        label="Password"
                        type={show ? "text" : "password"}
                        initialValue={formState.inputs.password.value}
                        initialValid={formState.inputs.password.isValid}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your password."
                        onInput={inputHandler}
                    />
                    <button
                        type="button"
                        onClick={toggleShow}
                        className="absolute right-3 bottom-3 focus:outline-none"
                    >
                        <img
                            src={show ? hideImage : showImage}
                            alt="toggle password"
                            className="w-5 h-5 opacity-70 hover:opacity-100"
                        />
                    </button>
                </div>

                <div className="pt-4">
                    <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-full w-full py-2">
                        Log In
                    </Button>
                </div>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
                Don’t have an account? {" "}
                <span onClick={() => navigate("/register")} className="text-blue-600 font-medium hover:underline cursor-pointer">
                    Register
                </span>
            </p>
        </div>
    );
}

export default LogIn;

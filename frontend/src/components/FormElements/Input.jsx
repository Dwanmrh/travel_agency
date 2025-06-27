import React, { useEffect, useReducer } from "react";
import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH":
            return { ...state, isTouched: true };
        default:
            return state;
    }
};

const Input = ({
    initialValue,
    initialValid,
    id,
    onInput,
    validators,
    label,
    disabled,
    labelStyle,
    type,
    placeholder,
    errorText,
}) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || "",
        isTouched: false,
        isValid: initialValid || false,
    });

    const { value, isValid, isTouched } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event) => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators,
        });
    };

    const touchHandler = () => {
        dispatch({ type: "TOUCH" });
    };

    const hasError = !isValid && isTouched;

    return (
        <div className="flex flex-col mb-5"> {/* memberi jarak antar input */}
            {label && (
                <label
                    htmlFor={id}
                    className={`mb-1 text-sm font-medium text-gray-700 ${labelStyle}`}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={changeHandler}
                onBlur={touchHandler}
                className={`w-full px-4 py-2 text-sm rounded-lg border transition duration-200 outline-none
                    ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                    ${
                        hasError
                            ? "border-red-400 bg-red-50 text-red-700 placeholder-red-400 focus:border-red-500 focus:ring-red-300"
                            : "border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }
                `}
            />
            {hasError && (
                <p className="mt-1 text-xs text-red-500 flex items-center">
                    <img src="/error-sign.svg" alt="error" className="w-4 h-4 mr-1" />
                    {errorText || "Invalid input"}
                </p>
            )}
        </div>
    );
};

export default Input;

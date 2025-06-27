import React from "react";
import { Link } from "react-router-dom";

const Button = ({
    to,
    children,
    type = "button",
    disabled = false,
    onClick,
    className = "",
    hasIcon,
    other,
}) => {
    if (to) {
        return (
            <Link to={to} className={className}>
                {children}
            </Link>
        );
    }

    if (hasIcon) {
        return (
            <button
                type={type}
                onClick={onClick}
                className={`${className} absolute hover:bg-blue-700 rounded-[4px]`}
            >
                {children}
            </button>
        );
    }

    if (other) {
        return (
            <button
                type={type}
                onClick={onClick}
                className={`flex justify-center items-center py-[11px] rounded font-semibold text-base cursor-pointer border ${other}`}
            >
                {children}
            </button>
        );
    }

    // 🔵 Default tombol biru
    const defaultClass = `hover:shadow-form rounded-[4px] w-full flex justify-center py-3 px-8 text-center text-base font-semibold text-white outline-none`;
    const finalClass = className
        ? className
        : `${disabled ? "bg-[#a9a9a9]" : "bg-blue-600 hover:bg-blue-700"} ${defaultClass}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={finalClass}
        >
            {children}
        </button>
    );
};

export default Button;

import React, { Children } from 'react';
import { FaSave, FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
interface ButtonProps {
    className?: string;
    onClick?: () => void;
    onSubmit?: () => void;
    children?: React.ReactNode;
}
export const EditButton = ({ onClick, className }: ButtonProps) => {
    return (
        <div>
            <button
                className={`w-24 text-white h-10 font-bold py-2 px-4 rounded bg-[green] ${className}`}
                onClick={onClick}
            >
                <div className=" flex justify-center items-cente">
                    <FaEdit />
                    {/* <span>Edit</span> */}
                </div>
            </button>
        </div>
    )
}


export const DeleteButton = ({ onClick, className }: ButtonProps) => {
    return (
        <div>
            <button
                className={`w-24 text-white h-10 font-bold py-2 px-4 rounded bg-[red]  ${className} `}
                onClick={onClick}
            >
                <div className=" flex justify-center items-cente">
                    <RiDeleteBinFill />
                    {/* <span>Delete</span> */}
                </div>

            </button>
        </div>
    )
}

export const SaveButton = ({ onClick, className }: ButtonProps) => {
    return (
        <div>
            <button
                className={`w-24 text-white h-10 font-bold  py-2 px-4 rounded bg-[#4d4dfd] ${className}`}
                onClick={onClick}
            >
                <div className=" flex justify-center items-center">
                    <FaSave />
                    {/* <span>Save</span> */}
                </div>

            </button>
        </div>
    )
}

export const DynamicIconButton = ({ className, onClick, children }: ButtonProps) => {
    return (
        <button className={`h-10 font-bold  py-2 px-4 rounded ${className}`} onClick={onClick}>
            <div className=" flex justify-center items-center">
            
            {children}
            </div>
        </button>
    );
};
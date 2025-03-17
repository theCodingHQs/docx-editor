import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-haiku';
import { ImCancelCircle } from "react-icons/im";
import Swal from 'sweetalert2';
import { dataTypeForInput } from '../../models/form';
type objectType = {
    [key: string]: any
}
interface SearchField {
    array: objectType[],
    conditions: string[] | string,
    requiredKey?: string,
    operator?: string,
    setterFunction?: React.SetStateAction<dataTypeForInput[] | any>

}

const SearchField = ({ array, conditions, requiredKey, setterFunction }: SearchField) => {
    const [searchFieldValue, setSearchFieldValue] = useState<string>("")
    const debouncedValue = useDebounce(searchFieldValue, 500)
    const alert = () => {
        Swal.fire({
            title: "No data found",
            icon: 'error',
            confirmButtonColor: "#CE2029"
        })
    }
    const handleChange = (value) => {
        // const { value } = e.target
        // setSearchFieldValue(value)
        if (value.length > 1) {
            const filteredArray = array?.filter((obj) => {
                if (typeof conditions === "string") {
                    return obj[conditions].toLowerCase().includes(value.toLowerCase()) ? (requiredKey ? { requiredKey: obj[requiredKey] } : obj) : null;
                } else {
                    const matchedObj = conditions.some((condition) => obj[condition]?.toLowerCase().includes(value.toLowerCase()));
                    return matchedObj ? (requiredKey ? { requiredKey: obj[requiredKey] } : obj) : null;
                }
            });
            filteredArray.length != 0
            setterFunction(filteredArray);
        } else {
            setterFunction(array);
        }
    }

    const handleCancel = () => {
        setSearchFieldValue('');
        setterFunction(array);
    }

    useEffect(()=>{
        handleChange(debouncedValue)
    },[debouncedValue])

    return (
        <div className="flex bg-blue-200 p-[2px] h-[30px]  rounded">
            <input
                placeholder="Search"
                value={searchFieldValue}
                className={`border  w-[250px] bg-white min-w-[200px] p-1 font-small rounded h-full `}
                onChange={(e) => setSearchFieldValue(e.target.value)}
            />
            {/* <button className="flex justify-center items-center m-0 w-12"><IoSearch className=" w-10 " onClick={() => handleSearch()}>Search</IoSearch></button> */}
            {
                !!searchFieldValue ?
                    <button className="flex justify-center items-center w-4 transition ease-in-out delay-150">
                        <ImCancelCircle className='w-10' onClick={() => handleCancel()}>Cancel</ImCancelCircle>
                    </button> : <></>
            }
        </div>
    )
}

export default SearchField

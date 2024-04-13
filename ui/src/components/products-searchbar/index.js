import React from "react";
import SearchIcon from "../../static/icons/search";
import { Form } from "react-bootstrap";

const SearchBar = ({onChange, value, ref }) => {
    return (
        <div className="relative flex items-center w-full">
            <Form className="w-full md:w-1/3 lg:w-2/3">
                <SearchIcon className="absolute left-7.5 top-2.5 ms-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Form.Control
                    className="bg-white shadow-none ps-5 dark:bg-gray-950"
                    // type="search"
                    type='text'
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    placeholder="Search products..."
                />
            </Form>
        </div>
    )
}

export default SearchBar
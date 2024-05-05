import React from "react";
import SpeakSearch from "../../../components/speak-search";
import { Form, Row, Col, Button } from "react-bootstrap";
import SlidersHorizontalIcon from "../../../static/icons/SlidersHorizontalIcon";
import SearchBar from "../../../components/products-searchbar";

const FiltersRow = ({ searchTerm, handleSearchChange, searchInputRef, handleAudioSearch, priceFilter, handlePriceFilterChange, handleToggleFilters }) => {
    return (
        <Row className='mb-4 m-0 ps-2 bg-gray-400 rounded-1' >
            <Col className='d-flex justify-content-start ps-0 py-2'>
                <SearchBar value={searchTerm} onChange={handleSearchChange} ref={searchInputRef} />
            </Col>
            <Col md={'auto'} className='d-flex align-items-start ms-0 me-3 py-2 ps-0'>
                <div className="d-flex align-items-center">
                    <span className="me-2 font-semibold">Try Urdu Audio</span>
                    <div className='ms-2'>
                        <Form.Group>
                            {/* Render SpeakSearch component */}
                            <SpeakSearch handleAudioSearch={handleAudioSearch} />
                        </Form.Group>
                    </div>
                </div>
            </Col>
            <Col md={'auto'} className='d-flex align-items-center px-0 gap-2'>

                {/* <>
                    <Form.Label className='me-2 font-semibold'>Sort by Price:</Form.Label>
                    <Form.Group className=''>
                        <Form.Select value={priceFilter} onChange={handlePriceFilterChange}>
                            <option value='asc'>Low to High</option>
                            <option value='desc'>High to Low</option>
                        </Form.Select>
                    </Form.Group>
                </> */}

                <Button onClick={handleToggleFilters} className="" variant="ghost">
                    <SlidersHorizontalIcon />
                </Button>
                {/* <Button onClick={handleToggleFilters} className='' variant='outline-primary'>Filters</Button> */}
            </Col>

        </Row>
    )
}

export default FiltersRow
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { useNavigate } from 'react-router-dom';

//react-bootstrap
import { Container, Row, Col, Form, Button, Offcanvas } from 'react-bootstrap'

//components
import AlertComp from '../../components/alert'
import Footer from '../../components/footer'
import ProductCard from '../../components/product/ProductCard'
import SpinnerComp from '../../components/spinner'
import SpeakSearch from '../../components/speak-search';

//redux
import { useSelector, useDispatch } from 'react-redux'
//actions
import { add, increase } from '../../redux/slice/cart/cart-slice'

const AllProductsPage = ({ user }) => {
	const navigate = useNavigate();

	const dispatch = useDispatch()
	const searchInputRef = useRef(null)

	//states
	const [searchTerm, setSearchTerm] = useState('')
	const [priceFilter, setPriceFilter] = useState('desc')
	const [fetchProductError, setFetchProductError] = useState(false)

	const [wishlist, setWishlist] = useState([]);

	// state to hande if product is added to cart
	const [addedToCart, setAddedToCart] = useState(false)
	const [errorText, setErrorText] = useState('')
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	//states for pagination
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 12

	/// error handeling for wishlist
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	//redux state
	const cartProducts = useSelector((state) => state.cart.products)







	const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);












	const fetchWishlist = async () => {
		setIsError(false); // Reset error state before making a new request

		try {
			const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/wishlist/get`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			if (response.status === 200) {
				setWishlist(response.data); // assuming the response data structure matches your needs
			}
		} catch (error) {
			console.log('Error fetching wishlist:', error);
			setIsError(true);
			setErrorMessage('Wishlist not found or there was an error fetching it.');
			// You can customize the error message based on the specific error if needed
		}
	}


	useEffect(() => {
		fetchWishlist();

		debouncedFetchData()
		fetchFilters();
		// Cleanup the debounced function when the component is unmounted
		return () => {
			debouncedFetchData.cancel()
		}
	}, [currentPage, priceFilter, searchTerm])

	// useEffect(() => {
	// 	if (searchInputRef.current) {
	// 		searchInputRef.current.focus()
	// 	}
	// })







	


    const fetchFilters = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/all-filters`);
            if (response.status === 200) {
				console.log(response.data);
                setFilters(response.data);
            }
        } catch (error) {
            console.error('Error fetching filters:', error);
        }
    };

    const handleToggleFilters = () => setShowFilters(!showFilters);

const handleFilterChange = async (selectedFilter) => {
    setSelectedFilters((prevFilters) => {
        // Ensure prevFilters is always treated as an array
        const currentFilters = Array.isArray(prevFilters) ? prevFilters : [];
        
        let updatedFilters;
        // Check if the filter is already selected
        if (currentFilters.includes(selectedFilter)) {
            // If it is, remove it from the selected filters
            updatedFilters = currentFilters.filter(filter => filter !== selectedFilter);
        } else {
            // If it's not, add it to the selected filters
            updatedFilters = [...currentFilters, selectedFilter];
        }

        // Now, send updatedFilters to the backend
        sendFiltersToBackend(updatedFilters);

        // Return updatedFilters to update the state
        return updatedFilters;
    });
};

const sendFiltersToBackend = async (filters) => {
	const filtersString = filters.join(',');
	console.log(filtersString);

    try {
        const response = await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/allproducts?page=${currentPage}&size=${pageSize}&sort=${priceFilter}&name=${searchTerm}categories=${encodeURIComponent(filtersString)}`, {
            filters: filters
        });
        console.log('Filters sent successfully', response.data);
        // Handle response data or perform actions based on the response
    } catch (error) {
        console.error('Error sending filters to backend:', error);
        // Handle errors, such as by displaying an error message to the user
    }
};


useEffect(() => {
    // Call fetchProducts again whenever selectedFilters changes
    debouncedFetchData();
}, [selectedFilters]);








	const fetchProducts = async () => {
		let response = ''
		try {
			setLoading(true)
			setFetchProductError(false)
			// Make an API request to route with the selected price filter and searchTerm as query parameters
			response = await axios.get(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/products/allproducts?page=${currentPage}&size=${pageSize}&sort=${priceFilter}&name=${searchTerm}`
			)
			if (response.status && response.status === 200) {
				const { totalPages, data } = response.data
				setProducts(data)
				setTotalPages(totalPages)
				setTimeout(() => {
					setLoading(false)
				}, 1000)
			}
			else {
				setFetchProductError(true)
				setErrorText('Error in fetching products')
				setTimeout(() => {
					setLoading(false)
				}, 1000)
			}

		} catch (error) {
			setTimeout(() => {
				setLoading(false)
			}, 1000)

			if (error.response?.status && error.response.status === 404) {
				setErrorText('No product with this name')
			}
			else {
				setErrorText('Error in fetching products')
			}
			setFetchProductError(true)
			// console.error('Error fetching data:', error)
		}

	}

	// Debounced version of fetchProducts
	const debouncedFetchData = debounce(fetchProducts, 1000)

	const handleSearchChange = (event) => {
		const { value } = event.target
		setSearchTerm(value)
		setCurrentPage(1)
	}

	const handlePriceFilterChange = (event) => {
		setPriceFilter(event.target.value)
	}

	const addToCart = (product) => {
		const foundProduct = cartProducts.find((item) => item._id == product._id)
		//check not already added
		if (!foundProduct) {
			const item = products.find((p) => p._id === product._id)
			dispatch(add(item))
			setAddedToCart(true)
		}
		else {
			dispatch(increase(product._id))
		}
	}
	// Navigate to product detail page on image click
	const handleProductClick = (productId) => {
		navigate(`/product-detail/${productId}`, { state: { wishlist: wishlist, productId: productId } });
	};
	const isAlreadyAdded = (product) => {
		const foundProduct = cartProducts.find((item) => item._id == product._id)
		return foundProduct ? true : false
	}

	const addToWishlist = async (product) => {
		// API call to add product to wishlist
		try {
			const res = await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/wishlist/add`, {
				productId: product._id
			},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});
			if (res.status == 200) {
				setWishlist(currentWishlist => {
					// Add the product to the wishlist if not already present
					if (!currentWishlist.some(item => item._id === product._id)) {
						return [...currentWishlist, product];
					}
					return currentWishlist;
				});
			}

		} catch (error) {
			console.error('Error adding to wishlist:', error);
		}
	};

	const isAlreadyInWishlist = (product) => {
		const foundProduct = wishlist.find((item) => item._id == product._id)
		return foundProduct ? true : false
	};

	// send audio file to server
	const handleAudioSearch = (blob) => {
		// Create a FormData instance
		let data = new FormData();

		// Append the audio blob to the FormData instance
		data.append('audio', blob, 'audio.wav');

		// Send the FormData instance to the server
		axios.post('http://localhost:5000/audio', data)
			.then((response) => {
				const {text} = response.data
				setSearchTerm(text)
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<>
			{loading ? (
				<SpinnerComp />
			) :
				(
					<>
						<Container fluid className='pt-0 p-5 mt-5'>

							<Row className='mb-3 m-0 ps-1 pe-1' >
								<Col className='d-flex justify-content-start ps-0'>
									<h2 className='text-primary'>All Products</h2>
								</Col>
								<Col md='auto' className='d-flex align-items-center'>
									<Form.Label className='me-2'><b>Search:</b></Form.Label>
									<Form.Group className='mb-1'>
										<Form.Control
											type='text'
											value={searchTerm}
											placeholder='Search product'
											onChange={handleSearchChange}
											ref={searchInputRef}
										/>
									</Form.Group>
									<Form.Group className='mb-1 ms-2'>
										<SpeakSearch handleAudioSearch={handleAudioSearch} />
									</Form.Group>
								</Col>
								<Col md='auto' className='d-flex align-items-center pe-0'>
									<Form.Label className='me-2'><b>Sort by:</b></Form.Label>
									<Form.Group className='mb-1'>
										<Form.Select value={priceFilter} onChange={handlePriceFilterChange}>
											<option value='asc'>Low to High</option>
											<option value='desc'>High to Low</option>
										</Form.Select>
									</Form.Group>
								</Col>





								<Col md='auto' className='d-flex align-items-center pe-0'>
									<Button onClick={handleToggleFilters} variant="outline-primary">Filters</Button>
								</Col>






							</Row>

							<div style={{ minHeight: '60vh' }}>
								{/*Map all products */}
								<Row className='justify-content-center'>
									{/* Desktop: Display 4 products per row 
									Tablet: 2 Products per row
									Mobile: 1 product per row */}
									{products.map((product, index) => (
										<Col key={index} xl={3} lg={6} md={6} sm={12} className='d-flex justify-content-center ps-0 pe-0 mb-5'>
											<div onClick={() => handleProductClick(product._id)}>

												<ProductCard
													name={user.name}
													product={product}
													addToCart={addToCart}
													addToWishlist={addToWishlist}
													addedToCart={isAlreadyAdded(product)}
													isInWishlist={() => isAlreadyInWishlist(product)} // Pass this prop
												/>
											</div>
										</Col>
									))}

								</Row>
							</div>

							<Footer className={'d-flex justify-content-between align-items-center ps-1 pe-1'}
								text={`${products.length} products found`}
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
							{fetchProductError && (
								<AlertComp
									variant='danger'
									text={errorText}
									onClose={() => setFetchProductError(false)}
								/>
							)}




						<Offcanvas show={showFilters} onHide={handleToggleFilters} placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Filters</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {/* Dynamically generate filter options */}
                                {filters.map((filter, index) => (
									<div key={index}>
										<Form.Check 
										type="checkbox" 
										label={filter} // Directly use filter as the label since it's a string
										id={`filter-${index}`} // Generate a unique ID for each checkbox
										onChange={() => handleFilterChange(filter)}
										/>
									</div>
									))}

                            </Offcanvas.Body>
                        </Offcanvas>








						</Container>
					</>
				)
			}
		</>
	)
}

export default AllProductsPage
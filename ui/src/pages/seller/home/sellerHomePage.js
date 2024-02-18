import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
//react-bootstrap
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap'

//components
import AlertComp from '../../../components/alert'
import DetailsTable from '../../../components/table'
import DeleteConfirmationModal from '../../../components/modal/delete-confirmation'
import Footer from '../../../components/footer'
import OrderSummary from '../../../components/order-summary'
import ProductCanvas from '../../../components/product-canvas'
import SpinnerComp from '../../../components/spinner'

import Sidebar from '../../../components/sidebar/SellerSidebar'

//svg
import { ReactComponent as Trash } from '../../../static/images/svg/Trash.svg'
import { ReactComponent as Edit } from '../../../static/images/svg/Pencil square.svg'


const AllProducts = ({ user }) => {

	//states for pagination
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 9

	const [processedOrders, setProcessedOrders] = useState([]); // New state for processed orders

	const [data, setData] = useState([])
	const [orderItem, setOrderItem] = useState()
	const [showOrderCanvas, setShowOrderCanvas] = useState(false)
	const [showProductCanvas, setShowProductCanvas] = useState(false)

	const [loading, setLoading] = useState(true)
	const [tableLoading, setTableLoading] = useState(true)
	const [fetchDataError, setFetchDataError] = useState(false)
	const [Errortext, setErrorText] = useState('')

	const [product, setproduct] = useState('')
	const [showDeleteModal, setShowDeleteModal] = useState(false)

	const [selectedItem, setSelectedItem] = useState('Products')
	const [searchTerm, setSearchTerm] = useState('')

	const searchInputRef = useRef(null)

	useEffect(() => {
		debouncedFetchData()
		// Cleanup the debounced function when the component is unmounted
		return () => {
			debouncedFetchData.cancel()
		}
	}, [currentPage, selectedItem, searchTerm])

	useEffect(() => {
		setLoading(true)
		if (searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}, [])

	useEffect(() => {
		if (selectedItem === 'Process') {
			debouncedfetchOrders();
		} else {
			debouncedFetchData();
		}
	}, [currentPage, selectedItem, searchTerm]);

	const fetchData = () => {

		setFetchDataError(false)
		setTableLoading(true)
		if (selectedItem =='Products') {
			axios.get(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/${selectedItem.toLowerCase()}?prod=${searchTerm}&page=${currentPage}&size=${pageSize}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			).then((response) => {
				if (response.status && response.status === 200) {
					const { totalPages, data } = response.data
					setData(data)
					setFetchDataError(false)
					setTotalPages(totalPages)
				}
				setTimeout(() => {
					setLoading(false)
					setTableLoading(false)
				}, 1000)
			}).catch((error) => {
				if (error.response?.status && error.response.status === 401) {
					setErrorText('Unauthorized. Try login again')
				}
				else
					selectedItem === 'Products' ?
						setErrorText('Error while fetching products') : setErrorText('Error while fetching orders')
				setFetchDataError(true)
				setTimeout(() => {
					setLoading(false)
					setTableLoading(false)
				}, 1000)
			})
		}


	}

	// fetch orders
	const fetchProcessedOrders = async () => {
		try {
			setTableLoading(true); // Start loading
			const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/seller-orders?orderNumber=${searchTerm}`, {
				headers: { Authorization: `Bearer ${user.token}` }
			});
			const { totalPages, data } = response.data
			setProcessedOrders(data);
			setTotalPages(totalPages);
			// console.log(response.data); // Log to check response
		} catch (error) {
			// console.error('Error fetching processed orders:', error);
			setErrorText('Error fetching processed orders');
			setFetchDataError(true);
		} finally {
			setLoading(false); // Stop loading
			setTableLoading(false); // Stop table loading
		}
	};

	// Debounced version of fetchData
	const debouncedFetchData = debounce(fetchData, 1000)

	//Debounced version of fetchProcessedOrders
	const debouncedfetchOrders= debounce(fetchProcessedOrders, 1000);

	const handleTrashClick = (itemId) => {
		setproduct(itemId)
		setShowDeleteModal(true)
	}

	const handleDeleteConfirmation = () => {
		if (product) {

			setLoading(true)
			setFetchDataError(false)

			axios.delete(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/products/${product._id}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			).then((response) => {
				if (response.status && response.status === 200) {
					setCurrentPage(1)
					fetchData()
				}
				setTimeout(() => {
					setLoading(false)
					setTableLoading(true)
				}, 1000)
			}).catch((error) => {
				setErrorText(error.response.data)
				setFetchDataError(true)
				setTimeout(() => {
					setLoading(false)
				}, 1000)
			})
			setproduct(null)
			setShowDeleteModal(false)
		}

		setTableLoading(true)
	}

	const handleEditClick = (item) => {
		setproduct(item)
		setShowProductCanvas(true)
	}
	// Function to handle shipping an order
	const handleShip = async (orderId) => {
		try {
			await axios.patch(`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/ship/${orderId}`, {}, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			// Refresh the processed orders list
			fetchProcessedOrders();
		} catch (error) {
			console.error('Error shipping order:', error);
		}
	};

	// Function to handle delivering an order
	const handleDeliver = async (orderId) => {
		try {
			await axios.patch(`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/deliver/${orderId}`, {}, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			// Refresh the processed orders list
			fetchProcessedOrders();
		} catch (error) {
			console.error('Error delivering order:', error);
		}
	};

	const handleAddClick = () => {
		setproduct(null)
		setShowProductCanvas(true)
	}

	const handleItemClick = (item) => {
		setSearchTerm('')
		setSelectedItem(item);
	};

	const handleShouldFetchAgain = () => {
		fetchData()
	}

	const handleOrderDetailButtonClick = (item) => {
		setOrderItem(item)
		setShowOrderCanvas(true)
	}

	const handlePageChange = (page) => {
		setTableLoading(true)
		setCurrentPage(page)
	}

	const handleSearchChange = (event) => {
		const { value } = event.target
		setSearchTerm(value)
		// setCurrentPage(1)
	}

	const OrdersTablecolumns = []

	// Product table column styling
	const ProductsTablecolumns = [
		{
			header: 'Title',
			width: '32rem',
			render: (item) => (
				<div className='row align-items-center pe-5'>
					<div className='col-auto pe-0' >
						<Image src={item.image} alt='Product' className='table-product-img' />
					</div>
					<div className='col'>
						<span>{item.description}</span>
					</div>
				</div>
			),
		},
		{
			header: 'Price',
			width: '17rem',
			render: (product) => (
				product.price.toFixed(2)
			),
		},
		{
			header: 'Stock',
			width: '15rem',
			render: (product) => product.quantity
		},
		{
			header: 'Actions',
			render: (item) => (
				<>
					<button
						style={{ backgroundColor: 'inherit', border: 'none', paddingLeft: '0px' }}>
						<>
							<Trash onClick={() => handleTrashClick(item)} className='me-2' />
							<Edit onClick={() => handleEditClick(item)} />
						</>
					</button>
				</>
			),
		},
	]

	const ProcessedOrdersTableColumns = [
		{
			header: 'Date',
			width: '17rem',
			render: (item) => {
				const date = new Date(item.date);
				const localDate = date.toLocaleString(undefined, { timeZoneName: 'short' });
				return localDate;
			}
		},
		{
			header: 'Order#',
			width: '10rem',
			render: (item) => item.orderNumber
		},
		{
			header: 'User Address',
			width: '22rem',
			render: (item) => {
				const { shippingDetails } = item;
				return `${shippingDetails.name}, ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.zip}, ${shippingDetails.country}`;
			}
		},
		{
			header: 'Product(s) Description',
			width: '28rem',
			render: (item) => {
				return item.products.map(p => `${p.product.description} (Qty: ${p.quantity})`).join(', ');
			}
		},
		{
			header: 'Action',
			render: (item) => (
				<>
					<div className='d-flex'>
						<Button
							onClick={() => handleShip(item._id)}
							variant="info"
							disabled={item.products.some(p => p.deliverStatus !== 'Pending')}
						>
							Ship
						</Button>
						<Button
							onClick={() => handleDeliver(item._id)}
							variant="success"
							className="ms-2"
							disabled={item.products.some(p => p.deliverStatus !== 'Shipped')}
						>
							Deliver
						</Button>
					</div>
				</>
			),
		},
	];

	return (
		<>
			{loading ? (
				<SpinnerComp />
			) : (
				<Container fluid className='pt-0 p-5 ps-0'>
					<Row>
						<Col xs={3}>
							<Sidebar selectedItem={selectedItem} handleItemClick={handleItemClick} />
						</Col>
						<Col className="mt-4 px-3">
							{selectedItem === 'Orders' && <OrderSummary user={user} setErrorText={setErrorText} />}
							<Row className='mb-4 m-0'>
								<Col className='d-flex justify-content-start ps-0 align-items-center'>
									<h2 className='text-primary'>{selectedItem}</h2>
								</Col>
								<Col className='d-flex justify-content-end pe-0 align-items-center'>
									<Form.Label className='me-2 mt-1'><b>Search:</b></Form.Label>
									<Form.Group className='mb-1 mt-1'>
										<Form.Control
											type='text'
											value={searchTerm}
											placeholder='Search'
											onChange={handleSearchChange}
											ref={searchInputRef}
										/>
									</Form.Group>
									{selectedItem === 'Products' &&
										<Button onClick={handleAddClick} className='px-3 ms-2'>Add New</Button>
									}
								</Col>
							</Row>
							<div style={{ height: '24.4rem', overflowY: 'auto' }}>
								{tableLoading ? (
									<SpinnerComp />
								) : selectedItem === 'Process' ? (
									<DetailsTable
										data={processedOrders}
										columns={ProcessedOrdersTableColumns}
									/>
								) : selectedItem === 'Products' ? (
									<DetailsTable
										data={data}
										columns={ProductsTablecolumns}
									/>
								) : (
									<DetailsTable
										data={data}
										columns={OrdersTablecolumns}
									/>
								)}
							</div>
							<Footer
								className={'d-flex justify-content-between align-items-center pt-4 ps-1 pe-0'}
								text={''}
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={handlePageChange}
							/>
						</Col>
					</Row>

					{fetchDataError && (
						<AlertComp
							variant='danger'
							text={Errortext}
							onClose={() => setFetchDataError(false)}
						/>
					)}

					{showDeleteModal && (
						<DeleteConfirmationModal
							showDeleteModal={showDeleteModal}
							setShowDeleteModal={setShowDeleteModal}
							handleDeleteConfirmation={handleDeleteConfirmation}
						/>
					)}



					{showProductCanvas && (
						<ProductCanvas
							placement={'end'}
							show={showProductCanvas}
							setShow={setShowProductCanvas}
							product={product}
							handleShouldFetchAgain={handleShouldFetchAgain}
							token={user.token}
						/>
					)}
				</Container>
			)}
		</>
	);


}

export default AllProducts
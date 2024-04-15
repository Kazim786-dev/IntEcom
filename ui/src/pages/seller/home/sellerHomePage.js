import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
//react-bootstrap
import { Container, Row, Col, Form, Image, Button, Modal } from 'react-bootstrap'
import Chart from 'chart.js/auto'

//components
import AlertComp from '../../../components/alert'
import DetailsTable from '../../../components/table'
import DeleteConfirmationModal from '../../../components/modal/delete-confirmation'
import Footer from '../../../components/footer'
import OrderSummary from '../../../components/order-summary'
import ProductCanvas from '../../../components/product-canvas'
import SpinnerComp from '../../../components/spinner'

import Sidebar from '../../../components/sidebar/SellerSidebar'
const MemoizedSideBar = React.memo(Sidebar)

//svg
import { ReactComponent as Trash } from '../../../static/images/svg/Trash.svg'
import { ReactComponent as Edit } from '../../../static/images/svg/Pencil square.svg'


const AllProducts = ({ user }) => {

	//states for pagination
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 9

	const [processedOrders, setProcessedOrders] = useState([]) // New state for processed orders

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
	const [salesAnalytics, setSalesAnalytics] = useState(null)
	const chartRef = useRef(null)
	const searchInputRef = useRef(null)

	const [selectedProducts, setSelectedProducts] = useState([])
	const [showSaleConfirmationModal, setShowSaleConfirmationModal] = useState(false)
	const [salePercentage, setSalePercentage] = useState(0)
	const [notOnSale, setNotOnSale] = useState([])

	const [selectedProductsNotOnSale, setselectedProductsNotOnSale] = useState([])
	const [showEndSaleConfirmationModal, setShowEndSaleConfirmationModal] = useState(false)
	const [OnSale, setOnSale] = useState([])
	const [isAllEnd, setisAllEnd] = useState(false)
	const [isAllStart, setisAllStart] = useState(false)

	// useEffect(() => {
	// 	if (selectedItem === 'Products') {
	// 		debouncedFetchData()
	// 		// Cleanup the debounced function when the component is unmounted
	// 		return () => {
	// 			debouncedFetchData.cancel()
	// 		}
	// 	}

	// }, [selectedItem, searchTerm]) //currentPage, selectedItem, searchTerm

	useEffect(() => {
		setLoading(true)
		if (searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}, [])

	useEffect(() => {
		if(selectedItem!='Products')
		if (chartRef.current && salesAnalytics) {
			const ctx = chartRef.current.getContext('2d')

			const data = {
				labels: salesAnalytics.map(item => item._id),
				datasets: [
					{
						label: 'Total Quantity Sold',
						data: salesAnalytics.map(item => item.totalQuantitySold),
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
					{
						label: 'Total Price Earned',
						data: salesAnalytics.map(item => item.totalCost),
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
					},
				],
			}

			const options = {
				indexAxis: 'y', // Use 'y' for horizontal bar chart
				scales: {
					x: {
						beginAtZero: true,
					},
				},
			}

			let myChart = new Chart(ctx, {
				type: 'bar',
				data,
				options,
			})

			// Ensure that the previous Chart instance is destroyed
			return () => {
				myChart.destroy()
			}
		}
	}, [salesAnalytics])

	const debouncedApiCalls = debounce((selectedItem) => {
		console.log(selectedItem)
		if (selectedItem === 'Products'){
			fetchData()
		} else if (selectedItem === 'Process') {
			fetchProcessedOrders()
		} else if (selectedItem === 'Analytics') {
			fetchSalesAnalytics()
		} else if (selectedItem === 'Discount Management') {
			loadNotOnDiscount()
		} else if (selectedItem === 'End Sale') {
			loadOnDiscount()
		}
	}, 1000);

	useEffect(() => {
		debouncedApiCalls(selectedItem)

		return () => {
			debouncedApiCalls.cancel()
		}
	}, [currentPage, selectedItem, searchTerm])

	const fetchSalesAnalytics = async () => {
		try {
			setTableLoading(true)
			axios.get(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/detailsAnalytics?prod=${searchTerm}&page=${currentPage}&size=${pageSize}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			).then((response) => {

				if (response.status && response.status === 200) {
					console.log(response)
					const totalPages = response.totalPages
					setSalesAnalytics(response.data)
					setFetchDataError(false)
					setTotalPages(totalPages)
				}
				setTimeout(() => {
					setLoading(false)
					setTableLoading(false)
				}, 1000)
			})

		} catch (error) {
			console.error('Error fetching sales analytics:', error)
			setFetchDataError(true)
			setTableLoading(false)
		}
	}

	const fetchData = () => {

		setFetchDataError(false)
		setTableLoading(true)
		if (selectedItem == 'Products') {
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
			setTableLoading(true) // Start loading
			const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/seller-orders?orderNumber=${searchTerm}`, {
				headers: { Authorization: `Bearer ${user.token}` }
			})
			const { totalPages, data } = response.data
			setProcessedOrders(data)
			setTotalPages(totalPages)
			// console.log(response.data) // Log to check response
		} catch (error) {
			// console.error('Error fetching processed orders:', error)
			setErrorText('Error fetching processed orders')
			setFetchDataError(true)
		} finally {
			setLoading(false) // Stop loading
			setTableLoading(false) // Stop table loading
		}
	}

	const loadNotOnDiscount = async () => {
		try {
			setTableLoading(true)
			const response = await axios.get(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/products/user-not-on-discount?page=${currentPage}&size=${pageSize}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			)
			if (response.status === 200) {
				setNotOnSale(response.data.data)
				setFetchDataError(false)
				setTotalPages(response.data.totalPages)
				setTableLoading(false)
			}
		} catch (error) {
			console.error('Error fetching products not on discount:', error)
			setFetchDataError(true)
		} finally {
			setTableLoading(false)
		}
	}

	//end sale
	const loadOnDiscount = async () => {
		try {

			setTableLoading(true)

			const response = await axios.get(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/products/user-on-discount?page=${currentPage}&size=${pageSize}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			)
			if (response.status === 200) {
				setOnSale(response.data.data)
				setFetchDataError(false)
				setTotalPages(response.data.totalPages)
			}
			setTableLoading(false)
		} catch (error) {
			console.error('Error fetching products not on discount:', error)
			setFetchDataError(true)
		} finally {
			setTableLoading(false)
		}
	}

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
			})
			// Refresh the processed orders list
			fetchProcessedOrders()
		} catch (error) {
			console.error('Error shipping order:', error)
		}
	}

	// Function to handle delivering an order
	const handleDeliver = async (orderId) => {
		try {
			await axios.patch(`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/deliver/${orderId}`, {}, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			// Refresh the processed orders list
			fetchProcessedOrders()
		} catch (error) {
			console.error('Error delivering order:', error)
		}
	}

	//seller analytics information
	const SellersTablecolumns = [
		{
			header: 'Name',
			render: (detail) => detail.name,
		},
		{
			header: 'Total Quantity Sold',
			render: (detail) => detail.totalQuantitySold,
		},
		{
			header: 'Total Price Earned',
			render: (detail) => detail.totalCost.toFixed(2),
		},
	]

	const handleItemClick = (item) => {
		setCurrentPage(1)
		setTableLoading(true)
		setSelectedItem(item)
	}

	const handleAddClick = () => {
		setproduct(null)
		setShowProductCanvas(true)
	}


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

	const handleCheckboxChange = (productId) => {
		const updatedSelectedProducts = [...selectedProducts]
		if (updatedSelectedProducts.includes(productId)) {
			// Product is already selected, remove it
			const index = updatedSelectedProducts.indexOf(productId)
			updatedSelectedProducts.splice(index, 1)
		} else {
			// Product is not selected, add it
			updatedSelectedProducts.push(productId)
		}
		setSelectedProducts(updatedSelectedProducts)
	}

	const handleConfirmSale = async () => {
		try {
			// Prepare the data to be sent to the server
			let saleData = {
				productIds: selectedProducts,
				offPercent: salePercentage,
				flag: false
			}
			if (isAllStart) {
				saleData.flag = true
			}
			// Send the data to the server
			const response = await axios.post(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/products/user-put-on-sale`,
				saleData,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			)

			// Handle the response here, such as updating state or showing a success message
			if (response.status == 200) {
				// Update the state 'notOnSale' by filtering out the products that are in 'selectedProducts'
				setNotOnSale((prevProducts) =>
					prevProducts.filter((product) => !selectedProducts.includes(product._id))
				)
			}
			if (isAllStart) {
				setNotOnSale([])
				setisAllStart(false)
				setShowSaleConfirmationModal(false)
			}

			// After processing the sale, you can reset the state
			setSelectedProducts([])
			setSalePercentage(0)

			// Close the confirmation modal
			setShowSaleConfirmationModal(false)
		} catch (error) {
			console.error('Error confirming sale:', error)
			// Handle error here, such as updating state or showing an error message
		}
	}

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
					<button className='d-flex'
						style={{ border: 'none', paddingLeft: '0px' }}>
						<Trash onClick={() => handleTrashClick(item)} className='me-2' />
						<Edit onClick={() => handleEditClick(item)} />
					</button>
				</>
			),
		},
	]

	// for sale management table
	const productsColumns = [
		{
			header: 'Product',
			width: '32rem',
			render: (item) => item.description,

		}, {
			header: 'Price',
			width: '15rem',
			render: (item) => item.price,

		}, {
			header: 'Stock',
			width: '15rem',
			render: (item) => item.quantity,

		},
		{
			header: 'Select',
			render: (item) => (
				<Form.Check
					type="checkbox"
					checked={selectedProducts.includes(item._id)}
					onChange={() => handleCheckboxChange(item._id)}
				/>
			),
		},
	]

	const OrdersTablecolumns = []

	const ProcessedOrdersTableColumns = [
		{
			header: 'Date',
			width: '17rem',
			render: (item) => {
				const date = new Date(item.date)
				const localDate = date.toLocaleString(undefined, { timeZoneName: 'short' })
				return localDate
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
				const { shippingDetails } = item
				return `${shippingDetails.name}, ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.zip}, ${shippingDetails.country}`
			}
		},
		{
			header: 'Product(s) Description',
			width: '28rem',
			render: (item) => {
				return item.products.map(p => `${p.product.description} (Qty: ${p.quantity})`).join(', ')
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
	]

	const EndSaleProductsColumns = [
		{
			header: 'Product',
			width: '32rem',
			render: (item) => item.description,

		}, {
			header: 'Price',
			width: '15rem',
			render: (item) => (item.offPercent / 100) * item.price,

		}, {
			header: 'Stock',
			width: '15rem',
			render: (item) => item.quantity,

		},
		{
			header: 'Sale Percentage',
			width: '15rem',
			render: (item) => item.offPercent,

		},
		{
			header: 'End Sale',
			render: (item) => (
				<Form.Check
					type="checkbox"
					checked={selectedProductsNotOnSale.includes(item._id)}
					onChange={() => handleCheckboxChangEndSale(item._id)}
				/>
			),
		},
	]

	const handleConfirmEndSale = async () => {
		try {
			// Prepare the data to be sent to the server
			let saleData = {
				productIds: selectedProductsNotOnSale,
				flag: false
			}

			if (isAllEnd) {
				saleData.flag = true
			}
			// Send the data to the server
			const response = await axios.post(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/products/user-end-sale`,
				saleData,

				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			)

			// Handle the response here, such as updating state or showing a success message
			if (response.status == 200) {
				// Update the state 'notOnSale' by filtering out the products that are in 'selectedProducts'
				setOnSale((prevProducts) =>
					prevProducts.filter((product) => !selectedProductsNotOnSale.includes(product._id))
				)
			}
			if (isAllEnd) {
				setOnSale([])
				setisAllEnd(false)
				setShowEndSaleConfirmationModal(false)
			}

			// After processing the sale, you can reset the state
			setselectedProductsNotOnSale([])

			// Close the confirmation modal
			setShowEndSaleConfirmationModal(false)
		} catch (error) {
			console.error('Error confirming sale:', error)
			// Handle error here, such as updating state or showing an error message
		}
	}

	const handleCheckboxChangEndSale = (productId) => {
		const updatedSelectedProducts = [...selectedProductsNotOnSale]
		if (updatedSelectedProducts.includes(productId)) {
			// Product is already selected, remove it
			const index = updatedSelectedProducts.indexOf(productId)
			updatedSelectedProducts.splice(index, 1)
		} else {
			// Product is not selected, add it
			updatedSelectedProducts.push(productId)
		}
		setselectedProductsNotOnSale(updatedSelectedProducts)
	}

	// Debounced version of api calls
	const debouncedFetchData = debounce(fetchData, 300)
	// const debouncedFetchProcessedOrders = debounce(fetchProcessedOrders, 300)
	// const debouncedFetchSalesAnalytics = debounce(fetchSalesAnalytics, 300)
	// const debouncedLoadNotOnDiscount = debounce(loadNotOnDiscount, 300)
	// const debouncedLoadOnDiscount = debounce(loadOnDiscount, 300)

	return (
		<>
			{loading ? (
				<SpinnerComp />
			) : (
				<Container fluid className='pt-0 p-5 ps-0'>
					<Row>
						<Col xs={3}>
							<MemoizedSideBar selectedItem={selectedItem} handleItemClick={handleItemClick} />
						</Col>
						<Col xs={9} className="mt-4 px-3">
							{selectedItem === 'Analytics' &&
								<OrderSummary user={user} setErrorText={setErrorText} selectedItem={selectedItem} />
							}
							<Row className='mb-4 m-0'>
								<Col className='d-flex justify-content-start ps-0 align-items-center'>
									<h2 className='text-primary'>{selectedItem}</h2>
								</Col>
								<Col className='d-flex justify-content-end pe-0 align-items-center'>
									{selectedItem === 'Products' ? (
										<>
											<Form.Label className="me-2 mt-1"><b>Search:</b></Form.Label>
											<Form.Group className="mb-1 mt-1">
												<Form.Control
													className='pe-5'
													type="text"
													value={searchTerm}
													placeholder={`Search by ${selectedItem}`}
													onChange={handleSearchChange}
													ref={searchInputRef}
												/>
											</Form.Group>
											<Button onClick={handleAddClick} className='px-3 ms-2'>Add Product</Button>

										</>
									) : selectedItem === 'Discount Management' ? (
										<Col className='d-flex justify-content-end pe-0 align-items-center'>
											<Button className='me-2'
												onClick={() => {
													setShowSaleConfirmationModal(true)
													setisAllStart(true)
												}} disabled={salePercentage <= 0 || notOnSale.length == 0}>Apply on All</Button>
											{/* <div style={{ marginRight: '10px' }}></div> */}
											<Button onClick={() => setShowSaleConfirmationModal(true)} disabled={salePercentage <= 0 || selectedProducts.length == 0}>
												Apply on Selected
											</Button>
											<Form.Group className="ms-2 p-0">
												<Form.Control
													type="number"
													value={salePercentage}
													placeholder="Discount Percentage"
													onChange={(e) => setSalePercentage(e.target.value)}
													min="0"
												/>
											</Form.Group>
										</Col>
									) : selectedItem === 'End Sale' ? (
										<>
											<Col className='d-flex justify-content-end pe-0 align-items-center'>
												<Button onClick={() => setShowEndSaleConfirmationModal(true)} disabled={selectedProductsNotOnSale.length == 0}>End Sale</Button>
												<div style={{ marginRight: '10px' }}></div>
												<Button onClick={() => {
													setShowEndSaleConfirmationModal(true)
													setisAllEnd(true)
												}} disabled={OnSale.length == 0}>End Sale for all</Button>
											</Col>
										</>
									) : <></>}
								</Col>
							</Row>
							<Row>
								{selectedItem === 'Analytics' && salesAnalytics && (
									<div className="my-4">
										<canvas ref={chartRef} id="salesChart" width="400" height="200"></canvas>
									</div>
								)}
							</Row>

							{/* Sale confirmation modal */}
							<Modal show={showSaleConfirmationModal} onHide={() => setShowSaleConfirmationModal(false)}>
								<Modal.Header closeButton>
									<Modal.Title>Confirm Sale</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									Are you sure you want to put the products on sale with a {salePercentage}% discount?
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={() => setShowSaleConfirmationModal(false)}>
										Cancel
									</Button>
									<Button variant="primary" onClick={handleConfirmSale}>
										Confirm
									</Button>
								</Modal.Footer>
							</Modal>


							{/* end Sale confirmation modal */}
							<Modal show={showEndSaleConfirmationModal} onHide={() => setShowEndSaleConfirmationModal(false)}>
								<Modal.Header closeButton>
									<Modal.Title>Confirm End Sale</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									Are you sure you want to put products on back on origional price?
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={() => setShowEndSaleConfirmationModal(false)}>
										Cancel
									</Button>
									<Button variant="primary" onClick={handleConfirmEndSale}>
										Confirm
									</Button>
								</Modal.Footer>
							</Modal>
{/* className='border shadow-sm rounded' */}
							<div className='border shadow-md rounded' style={{ height: '24.4rem', overflowY: 'auto' }} >
								{tableLoading ? (
									<SpinnerComp />
								) : selectedItem === 'Discount Management' && notOnSale ? (
									<DetailsTable
										data={notOnSale}
										columns={productsColumns}
									/>
								) : selectedItem === 'End Sale' && OnSale ? (
									<DetailsTable
										data={OnSale}
										columns={EndSaleProductsColumns}
									/>
								) : selectedItem === 'Process' ? (
									<DetailsTable
										data={processedOrders}
										columns={ProcessedOrdersTableColumns}
									/>
								) : selectedItem === 'Analytics' && salesAnalytics ? (
									<DetailsTable
										data={salesAnalytics}
										columns={SellersTablecolumns}
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
	)


}

export default AllProducts
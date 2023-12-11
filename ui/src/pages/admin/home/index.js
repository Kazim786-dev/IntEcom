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
import OffCanvasComp from '../../../components/offcanvas'
import OrderSummary from '../../../components/order-summary'
import ProductCanvas from '../../../components/product-canvas'
import SpinnerComp from '../../../components/spinner'

import Sidebar from '../../../components/sidebar'

//svg
import { ReactComponent as Trash } from '../../../static/images/svg/Trash.svg'
import { ReactComponent as Edit } from '../../../static/images/svg/Pencil square.svg'
import { ReactComponent as ArrowUpRight } from '../../../static/images/svg/Arrow up right.svg'


const AllProducts = ({ user }) => {

	//states for pagination
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 9
	const [sellers, setSellers] = useState([]);

    const [processedOrders, setProcessedOrders] = useState([]); // New state for processed orders

	const [data, setData] = useState([])
	const [orderItem, setOrderItem] = useState()
	const [showOrderCanvas, setShowOrderCanvas] = useState(false)
	const [showProductCanvas, setShowProductCanvas] = useState(false)

	const [loading, setLoading] = useState(true)
	const [tableLoading, setTableLoading] = useState(true)
	const [fetchDataError, setFetchDataError] = useState(false)
	const [Errortext, setErrorText] = useState('')
    const [reportedProducts, setReportedProducts] = useState([]); // State for reported products
    const [reportLoading, setReportLoading] = useState(false); // Loading state for reports

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

	useEffect(()=> {
		setLoading(true)
		if(searchInputRef.current){
			searchInputRef.current.focus()
		}	
	},[])

	const fetchData = () => {
		
		setFetchDataError(false)
		if(selectedItem!=='Sellers' && selectedItem!=='Process' && selectedItem!== 'reported'){
			axios.get(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/${selectedItem.toLowerCase()}?searchQuery=${searchTerm}&page=${currentPage}&size=${pageSize}`,
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

	// Debounced version of fetchData
	const debouncedFetchData = debounce(fetchData, 1000)

	const handleTrashClick = (itemId) => {
		setproduct(itemId)
		setShowDeleteModal(true)
	}

	const fetchProcessedOrders = async () => {
        try {
            setTableLoading(true); // Start loading
            const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/seller-orders`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setProcessedOrders(response.data);
        } catch (error) {
            console.error('Error fetching processed orders:', error);
            setErrorText('Error fetching processed orders');
            setFetchDataError(true);
        } finally {
            setLoading(false); // Stop loading
            setTableLoading(false); // Stop table loading
        }
    };
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

	setTableLoading(true)	}

	const handleEditClick = (item)=> {
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
	
	const handleAddClick = ()=> {
		setproduct(null)
		setShowProductCanvas(true)
	}

    const handleItemClick = (item) => {
        setCurrentPage(1);
        setLoading(true);
        setSelectedItem(item);
        if (item === 'reported') {
            fetchReportedProducts();
        } else if (item === 'Process') {
            fetchProcessedOrders();
        } else {
            debouncedFetchData();
        }
    };

	const handleShouldFetchAgain= ()=> {
		fetchData()
	}

	const handleSearchChange = (event) => {
		const { value } = event.target
		setSearchTerm(value)
		setTableLoading(true)
		setCurrentPage(1)
	}

	const handleOrderDetailButtonClick = (item) => {
		setOrderItem(item)
		setShowOrderCanvas(true)
	}

	const handlePageChange = (page)=> {
		setTableLoading(true)
		setCurrentPage(page)
	}


	
    useEffect(() => {
        if (selectedItem === 'Sellers') {
            fetchSellers();
        } else if (selectedItem === 'Process') {
            fetchProcessedOrders();
        } else if (selectedItem === 'reported') {
            fetchReportedProducts();
        } else {
            debouncedFetchData();
        }
    }, [currentPage, selectedItem, searchTerm]);
	const fetchReportedProducts = async () => {
		setReportLoading(true); // Start loading for reported products
		setLoading(true);      // Start main loading
		try {
			const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/all-reports`, {
				headers: { Authorization: `Bearer ${user.token}` }
			});

			setReportedProducts(response.data);
		} catch (error) {
			console.error('Error fetching reported products:', error);
			setErrorText('Error fetching reported products');
			setFetchDataError(true);
		} finally {
			setReportLoading(false); // Stop loading for reported products
			setLoading(false);       // Stop main loading
		}
	};
	
    const fetchSellers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/users/sellers?/page=${currentPage}&size=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response.status === 200) {
				
                setSellers(response.data.sellers);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error('Error fetching sellers:', error);
        } finally {
            setLoading(false);
        }
    };

	const handleAcceptSeller = async (sellerId) => {
		try {
			await axios.patch(`${process.env.REACT_APP_DEV_BACKEND_URL}/users/sellers/accept/${sellerId}`, {}, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			// Refresh the sellers list after accepting
			fetchSellers();
		} catch (error) {
			console.error('Error accepting seller:', error);
		}
	};
	
	const handleRejectSeller = async (sellerId) => {
		try {
			await axios.patch(`${process.env.REACT_APP_DEV_BACKEND_URL}/users/sellers/reject/${sellerId}`, {}, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			// Refresh the sellers list after rejecting
			fetchSellers();
		} catch (error) {
			console.error('Error rejecting seller:', error);
		}
	};

    const SellerTablecolumns = [
        {
            header: 'Name',
            render: (sellers) => sellers.name,
        },
        {
            header: 'Email',
            render: (sellers) => sellers.email,
        },
        {
            header: 'Actions',
            render: (sellers) => (
                <>
                    <Button onClick={() => handleAcceptSeller(sellers._id)} variant="success">Accept</Button>
                    <Button onClick={() => handleRejectSeller(sellers._id)} variant="danger" className="ms-2">Reject</Button>
                </>
            ),
        },
    ];

	
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
				product.price
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
							<Trash onClick={() => handleTrashClick(item)} className='me-3' />
							<Edit onClick={() => handleEditClick(item)} />
						</>
					</button>
				</>
			),
		},
	]
	
	const handleBlockProduct = async (productId) => {
		try {
			const response = await axios.patch(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/block/${productId}`, {}, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			// Handle response here, such as updating state or showing a success message
			console.log('Product blocked successfully', response.data);
			// Optionally, refresh the data to reflect the changes
			fetchReportedProducts();
		} catch (error) {
			console.error('Error blocking product:', error);
			// Handle error here, such as updating state or showing an error message
		}
	};
	

	const handleCancelReport = async (reportId) => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/cancel-report/${reportId}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			// Handle response here, such as updating state or showing a success message
			console.log('Report canceled successfully', response.data);
			// Optionally, refresh the data to reflect the changes
			fetchReportedProducts();
		} catch (error) {
			console.error('Error canceling report:', error);
			// Handle error here, such as updating state or showing an error message
		}
	};
	

    const ReportedProductsTableColumns = [
        // Define columns for reported products table
        {
            header: 'Reported Product',
            render: (report) => report.product.description,
        },
		{
            header: 'Report by',
            render: (report) => report.user.name,
        },
		{
            header: 'Reason',
            render: (report) => report.text,
        },
        // ... other columns for product details
        {
            header: 'Actions',
            render: (report) => (
                <>
                    <Button onClick={() => handleBlockProduct(report.product._id)} variant="danger">Block Product</Button>
                    <Button onClick={() => handleCancelReport(report._id)} variant="secondary" className="ms-2">Cancel Report</Button>
                </>
            ),
        },
    ];

	// Order table column styling
	const OrdersTablecolumns = [
		{
			header: 'Date',
			width: '17rem',
			render: (item) => {
				const date = new Date(item.date)
				// const utcDate = date.toLocaleString('en-US', { timeZone: 'UTC' })
				const localDate = date.toLocaleString(undefined, { timeZoneName: 'short' })

				return localDate
			}
		},
		{
			header: 'Order#',
			width: '20rem',
			render: (item) => item.orderNumber
		},
		{
			header: 'User',
			width: '20rem',
			render: (item) => {
				if (item.user) {
					return item.user.name
				}
				return ''
			}
		},
		{
			header: 'Product(s)',
			width: '20rem',
			render: (item) => {
				// const totalProducts = item.products.length
				if (item.products) {
					return item.products.length
				}
				return 1
			}
		},
		{
			header: 'Amount',
			width: '17rem',
			render: (item) => {
				if (item.totalAmount)
					return '$' + item.totalAmount.toFixed(2)
				return '$' + 0
			}
		},
		{
			header: 'Action',
			render: (item) => (
				<>
					<button className="bg-white border-0" onClick={() => handleOrderDetailButtonClick(item)}><ArrowUpRight /></button>
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
				</>
			),
		},
	];
  
	return (
		<>
			{loading || reportLoading ? (
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
									{selectedItem === 'Products' ? (
										<Button onClick={handleAddClick} className='px-3'>Add New</Button>
									) : selectedItem !== 'Sellers' && selectedItem !== 'Process' && selectedItem !== 'reported' && (
										<>
											<Form.Label className="me-2"><b>Search:</b></Form.Label>
											<Form.Group className="mb-1">
												<Form.Control 
													className='pe-5' 
													type="text" 
													value={searchTerm} 
													placeholder={`Search by ${selectedItem}`} 
													onChange={handleSearchChange} 
													ref={searchInputRef}
												/>
											</Form.Group>
										</>
									)}
								</Col>
							</Row>
							<div style={{ height: '24.4rem', overflowY: 'auto' }}>
								{loading ? (
									<SpinnerComp />
								) : selectedItem === 'reported' ? (
									<DetailsTable
										data={reportedProducts}
										columns={ReportedProductsTableColumns}
									/>
								) :selectedItem === 'Process' ? (
									<DetailsTable
										data={processedOrders}
										columns={ProcessedOrdersTableColumns}
									/>
								) :selectedItem === 'Sellers' ? (
									<DetailsTable
										data={sellers}
										columns={SellerTablecolumns}
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
					
					{showOrderCanvas && (
						<OffCanvasComp
							placement={'end'}
							show={showOrderCanvas}
							setShow={setShowOrderCanvas}
							orderItem={orderItem}
							name={orderItem.user.name}
							token={user.token}
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
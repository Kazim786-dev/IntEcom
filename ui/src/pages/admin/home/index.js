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

	useEffect(()=> {
		setLoading(true)
		if(searchInputRef.current){
			searchInputRef.current.focus()
		}	
	},[])

	const fetchData = () => {
		
		setFetchDataError(false)
		if(selectedItem!=='Sellers'){
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

	const handleAddClick = ()=> {
		setproduct(null)
		setShowProductCanvas(true)
	}

	const handleItemClick = (item) => {
		setCurrentPage(1)
		setLoading(true)
		setSelectedItem(item)
	}

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
        } else {
            debouncedFetchData();
        }
    }, [currentPage, selectedItem, searchTerm]);

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
									{selectedItem === 'Products' ? (
										<Button onClick={handleAddClick} className='px-3'>Add New</Button>
									) : selectedItem !== 'Sellers' && (
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
								) : selectedItem === 'Sellers' ? (
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
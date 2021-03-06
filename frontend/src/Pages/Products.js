import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard';
import {getProduct, clearErrors} from '../Actions/productAction'
import { useSelector, useDispatch} from 'react-redux'
import '../Scss/products.css'
import Loader from '../Components/Loader';
import Pagination from "react-js-pagination";
import {useAlert} from 'react-alert'

const Products = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1)

    const { products, loading, error, productsCount, resultPerPage} = useSelector(
        (state)=> state.products
    );

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }

    useEffect(()=>{

        if(error){
            alert(error(error));
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage));
    }, [dispatch, keyword, currentPage, error, alert])

  return (
    <>
        {loading ? <Loader/> : 
            <>
                <h2 className='productsHeading'>Products</h2>

                <div className='products'>
                    {products && 
                        products.map((product)=> (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                </div>

                {resultPerPage < productsCount && (
                    <div className='paginationBox'>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>
                )}
            </>
        }
    </>
  )
}

export default Products
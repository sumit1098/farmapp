import React, { useEffect } from 'react'
import homeImage from '../Images/homeImage.jpg';
import '../Scss/home.css'
import ProductCard from '../Components/ProductCard';
import MetaData from '../Components/MetaData';
import {getProduct, clearErrors} from '../Actions/productAction'
import { useSelector, useDispatch} from 'react-redux'
import Loader from '../Components/Loader';
import {useAlert} from "react-alert"

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, error, products, productsCount} = useSelector(state=>state.products)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])
  return (
    <>
        { loading ? <Loader/>:     
        <>
        <MetaData title="E-commerce"/>
        <div className='home_container'>
            <div className='home_section_one'>
             <img src={homeImage} alt="home" className='home_image'/>
             <h1 className='home_section_one_header'>E-commerce name</h1>
            </div>

            <div className='home_section_two'>
                <h2 className='home_section_two_header'>Featured Products</h2>
                <div className='featured_product_container'>
                    {products && products.map((product) => <ProductCard product={product}/>)}
                </div>
                </div>
            </div>
        </>
    }
    </>
  )
}

export default Home
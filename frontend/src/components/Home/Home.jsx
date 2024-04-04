import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.jsx";
import MetaData from "../layout/MetaData.jsx";
import {getProducts} from "../../actions/productAction.js"
import {useDispatch, useSelector} from 'react-redux'
import Loader from "../layout/Loader/Loader.jsx";
import {Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const errorOption={
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  }
  
  const {loading, error, products,productsCount} = useSelector((state) => state.products);
  const dispatch=useDispatch();
  useEffect(() => {
    if(error){
      return  toast.error(`${error}`,errorOption);
    }else{
      dispatch(getProducts());
    }
    
  }, [dispatch,error]);
  return (
        <Fragment>
          {loading?(<Loader/>):(<Fragment>
          <MetaData title="Ecommerce"/>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading" id="container">Featured Products</h2>

          <div className="container" >
          {products && products.map(product => (
          <Product key={product._id} product={product} />
        ))}
          </div> 
        </Fragment>)}
        </Fragment>
  );
};

export default Home;

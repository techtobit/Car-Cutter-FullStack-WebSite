import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import './DisplayProduct.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import ReactReloadSpinier from '../../Animation/ReactReloadSpinier';

const DisplayProducts = ({ product }) => {
  const { _id, name, img, price, quantity } = product;
  const [style, setStyle] = useState({ display: 'none' });
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate();

  //navigate to buy products 
  const handelPurchase = id => {
    if (loading) {
      return <ReactReloadSpinier></ReactReloadSpinier>
    }
    else if (!user) {
      navigate('/login')
    }
    else {
      navigate(`/products/${id}`)
    }

  }
  return (
    <div >
      <div class="card rounded-none lg:w-80 h-96 md:w-fit bg-base-100 "

        >
        <div className='border-[0.5px] relative  border-neutral hover:border-primary border-opacity:90 rounded-none'
          onMouseEnter={e => {
          setStyle({
            display: 'block',
            text: 'center',
            transition: "delay: 1s",
            // transition: '0.3s'
          });
        }}
        onMouseLeave={e => {
          setStyle({
            display: 'none',
            transition: '0.3s'
          })
        }}
        >
        <figure className='m-5 object-cover '>
          <img className='product-img ' src={img} alt="product" />
          <button onClick={() => handelPurchase(_id)} class="card-actions w-[100%] h-[100%]  backdrop-opacity-10 backdrop-invert bg-white/30  absolute lg:justify-center" style={style} >
          {/* style={style} */}
            <div class="btn  btn-primary w-[50%] text-neutral font-bold">
              <FontAwesomeIcon icon={faCartArrowDown} className='text pr-2'></FontAwesomeIcon>
              Place Oder
            </div>
          </button>
        </figure>
        </div>
        <div class="py-[0.5">
          <h3 class="product-model">name</h3>
          <h3 class="product-name font-bold overflow-hidden ">{name}</h3>
          {/* <div className="card-data grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2">
            <div class="badge badge-primary text-neutral font-bold">Price : ${price}</div>
            <div class="badge badge-accent text-neutral font-bold border-1 border-primary">Stock: ${quantity}</div>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default DisplayProducts;
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from './Product';
import axios from 'axios';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const Products = ({cat,filter,sort}) => {
  console.log("catttttt",cat);
  const [products,setProducts]=useState([]);
  const [filteredproducts,setfilteredProducts]=useState([]);
  useEffect(()=>{
    const getProducts=async()=>{
      try {
        const res=await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}`:`http://localhost:5000/api/products`);
        console.log("res of products",res.data);
        setProducts(res.data);
      } catch (error) {
        console.log("error of products",error);
        
      }
    }
    getProducts();
  },[cat])

  useEffect(() => {
    cat &&
      setfilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filter]);

  useEffect(() => {
    if (sort === "newest") {
      setfilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setfilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setfilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  console.log("products/",products);

    return (
        <Container>
          { cat ?
          filteredproducts.map((item) => (
            <Product item={item} key={item.id} />
          ))
        :
        products.slice(0,8).map((item) => (
          <Product item={item} key={item.id} />
        ))
        }
        </Container>
      );
}

export default Products
import React, { useEffect, useState } from 'react'
import { Send } from "@material-ui/icons";
import styled from "styled-components";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios"
const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;
const Button1 = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Newsletter = () => {
  const [stripeToken,setStripeToken]=useState(null);

  const onToken=async(token)=>{
    // console.log("tokennnnnnn",token);
    setStripeToken(token)
  }
  useEffect(()=>{
    const makeRequest=async()=>{
      try {
        const res = await axios.post("http://localhost:5000/api/checkout/payment",{
          tokenId:stripeToken.id,
          amount:2000,
        })
        console.log("res of stripe--------",res.data);
      } catch (error) {
        console.log("stripeeee errror   ",error);
      }
    }
    stripeToken && makeRequest();
  },[stripeToken])

    return (
        <Container>
          <Title>Newsletter</Title>
          <Desc>Get timely updates from your favorite products.</Desc>
          <InputContainer>
            <Input placeholder="Your email" />
            <Button>
              <Send />
            </Button>
            <StripeCheckout name='Sujal Shop' image='https://i.ibb.co/DG69bQ4/2.png' billingAddress shippingAddress description='Your total amount is $20' amount={2000} token={onToken} stripeKey='pk_test_51OuV2vSCFksQgusNRMizn6BvKQClngWsDpjFiNiz5RRqYKYrVzTBbFCZ6hcXOesIgSDwdgn5pteQYV9rfwIkKD2u00m5ohdvj8'>
            <Button1 onClick={()=>console.log("hiiiiii")}>
              <Send />
            </Button1>
            </StripeCheckout>
           
          </InputContainer>
        </Container>
      );
}

export default Newsletter
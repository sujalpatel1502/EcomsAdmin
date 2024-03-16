const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  console.log("cameeeeeee-e--e-e-e-e-e-e",req.body);

stripe.customers.create({
  email:"sujalpatel1502@gmail.com",
  source: req.body.tokenId,
}).then(customer => 
  stripe.paymentIntents.create({
    amount: req.body.amount,
    automatic_payment_methods:{
      enabled:true
    },
    currency: "inr",
    description: 'Software development services',
    customer:customer.id
  })
  ).then((data)=>res.status(200).json(data))

  // stripe.paymentIntents.create(
  //   {
      
  //     amount: req.body.amount, 
  //     currency: "inr",
  //     description: 'Software development services',
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       console.log("errrrstripe",stripeErr);
  //       res.status(500).json(stripeErr);
  //     } else {
  //       res.status(200).json(stripeRes);
  //     }
  //   }
  
});

module.exports = router;
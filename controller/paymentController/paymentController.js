
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const paymentController = async (req,res,next) => {
  const { price,
    classId, } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(price) * 100,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { integration_check: "accept_a_payment" },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.json({ error});
  }
};

module.exports = {paymentController};

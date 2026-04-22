import axios from "axios";
import toast from "react-hot-toast";

export const handlePayment = async ({
  amount,
  callback,
  userDetails = {
    name: "Default User",
    email: "default@example.com",
    contact: "0000000000",
  },
  description = "Test Transaction",
  themeColor = "#3399cc",
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  try {
    const order = await axios.post(`${BASE_URL}/api/create-order`, { amount : 1 });
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.data.amount,
      currency: "INR",
      name: "Milestono",
      description: description,
      order_id: order.data.id,
      handler: async function (response) {
        try {
          await axios.post(`${BASE_URL}/api/verify-payment`, {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
          toast.success("Payment successful");
          if (callback) {
            callback();
          }
        } catch (verificationError) {
          console.error("Payment verification error:", verificationError);
          toast.error("Payment verification failed");
        }
      },
      prefill: userDetails,
      theme: { color: themeColor },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Payment failed");
  }
};

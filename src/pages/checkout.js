import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/react";
import axios from "axios";
// Stripe THINGS
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const session = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session...

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.data.user.email,
    });

    // Redirect user/customer to Stripe checkout

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/*LEft section */}
        <div className="flex-grow  m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            className="object-contain"
          ></Image>

          <div className="flex flex-col p-5 space-y-10 bg-white-100">
            <h1 className="text-3xl border-b pb-4">
              {items.length !== 0
                ? "Your Shopping Basket"
                : "Your Shopping Basket is Empty"}
            </h1>

            <div>
              {items.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  rating={item.rating}
                  hasPrime={item.hasPrime}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full flex-col bg-white p-4 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="mx-16">
                Sub total ({items.length} items) :
                <p className="font-bold">$ {total}</p>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;

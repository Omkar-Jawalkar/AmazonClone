import React from "react";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import db from "../../firebase";
import { getSession } from "next-auth/react";
import moment from "moment/moment";
import Order from "../components/Order";

const Orders = ({ orders }) => {
  const { data: session } = useSession();
  console.log(orders);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg p-10 mx-auto">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Orders
        </h1>

        {session ? (
          <h2> {orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mb-2">
          {orders?.map(({ id, amount, items, timestamp, images }) => (
            <Order
              id={id}
              amount={amount}
              items={items}
              timestamp={timestamp}
              images={images}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials...

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // stripe Orders

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders: orders,
    },
  };
}

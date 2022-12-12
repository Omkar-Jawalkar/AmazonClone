import { CheckCircleIcon } from "@heroicons/react/outline";
import React from "react";
import Header from "../../src/components/Header";
import { useRouter } from "next/router";

const success = () => {
  const router = useRouter();
  return (
    <div className="bg-white-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex w-full flex-col bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1>Thank you, your order has been confirmed!</h1>
          </div>
          <p>Thankyou for shopping with us </p>
          <button
            onClick={() => {
              router.push("/orders");
            }}
            className="button mt-8"
          >
            Go to my order
          </button>
        </div>
      </main>
    </div>
  );
};

export default success;

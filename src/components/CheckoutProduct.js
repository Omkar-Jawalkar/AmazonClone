import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) => {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    // Add item to basket

    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  const RemoveItemToBasket = () => {
    // Add item to basket

    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    dispatch(removeFromBasket(product));
  };
  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={180} width={180} objectFit="contain" />
      {/* Middle Section */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs line-clamp-3 mt-2 mb-2">{description}</p>
        <p className="font-bold mb-2">${price}</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-gray-500 text-xs">FREE ONE-DAY DELIVERY</p>
          </div>
        )}
      </div>

      {/* Right add and Remove */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button onClick={RemoveItemToBasket} className="button">
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;

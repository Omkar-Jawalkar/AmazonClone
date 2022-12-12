import React from "react";
import moment from "moment/moment";

const Order = ({ id, amount, items, timestamp, images }) => {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center p-5 bg-gray-100 text-sm text-gray-600 space-x-4">
        <p className="font-bold text-xs"> ORDER PLACED </p>
        <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>

        <div>
          <p className="font-bold text-xs"> TOTAL </p>
          <p>{amount}</p>
        </div>

        <p className="text-xs whitespace-nowrap flex-1 text-right text-blue-500 sm:text-xl self-end">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 text-xs truncate whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image, i) => (
            <img key={i} src={image} className="h-20 object-contain sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;

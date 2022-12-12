import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const { data: session } = useSession();
  const items = useSelector(selectItems);

  const router = useRouter();
  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center p-1 flex-grow py-2 bg-amazon_blue">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            className="cursor-pointer object-contain"
          />
        </div>
        <div className=" hidden sm:flex rounded-md flex-grow items-center h-10 bg-yellow-400">
          <input
            type="text"
            className="p-2 focus:outline-none rounded-l-md h-full flex-grow w-6"
          />
          <SearchIcon className="h-12 p-4 hover:bg-yellow-500 cursor-pointer" />
        </div>
        <div className="text-white whitespace-nowrap flex mx-6 text-xs space-x-6 items-center">
          <div
            onClick={!session ? signIn : signOut}
            className="cursor-pointer link"
          >
            <p> {session ? "Hello " + session.user.name : "Sign in"} </p>
            <p className="font-extrabold md:text-sm"> Account & Lists</p>
          </div>
          <div className="cursor-pointer link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="cursor-pointer relative link items-center flex"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 font-bold text-black rounded-full text-center bg-yellow-400">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold hidden md:inline mt-2 md:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="flex space-x-3 p-2 pl-6 text-white text-sm items-center bg-amazon_blue-light">
        <p className="flex link items-center">
          <MenuIcon className="h-6 link text-center mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link"> Amazon Website</p>
        <p className="link"> Today's Deals</p>
        <p className="link hidden lg:inline-flex"> Electronics</p>
        <p className="link hidden lg:inline-flex"> Food & Grocery</p>
        <p className="link hidden lg:inline-flex"> Prime</p>
        <p className="link hidden lg:inline-flex"> Buy Again</p>
        <p className="link hidden lg:inline-flex"> Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex"> Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;

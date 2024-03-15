"use client";
import useAddress from "@/app/hooks/use-address";
import { useEffect, useState } from "react";

export default function SummaryAddress({ paramslang }) {
  const [isMounted, setIsMounted] = useState(false);
  const address = useAddress((state) => state.address);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // if ( === 0) {
  //   console.log("El objeto está vacío");
  // } else {
  //   console.log("El objeto no está vacío");
  // }
  // console.log(address);
  return (
    <div>
      {Object.keys(address).length === 0 ? (
        <p className=" text-primaryBlue">
          {paramslang.addresses["no-address"]}
        </p>
      ) : (
        <div>
          <p className=" text-primaryBlue">
            <b>{paramslang.addresses.company}:</b> {address.officeName}
          </p>
          <p className=" text-primaryBlue">
            <b>{paramslang.addresses.address}:</b> {address.address}{" "}
            {address.postalCode && (
              <span>
                , CP.
                {address.postalCode}.
              </span>
            )}
          </p>
          {address.city && (
            <p className="text-primaryBlue">
              <b>{paramslang.addresses.city}:</b> {address.city}.
            </p>
          )}
          {address.state && (
            <p className="text-primaryBlue">
              <b>{paramslang.addresses.state}:</b> {address.state}.
            </p>
          )}
          {address.country && (
            <p className="text-primaryBlue">
              <b>{paramslang.addresses.country}:</b> {address.country}.
            </p>
          )}
          {address.price != 0 && (
            <p className="text-primaryBlue">
              <br />
              <b>
                {paramslang.addresses["each-shipping"]} ${address.price}{" "}
                {paramslang.addresses["each-shipping2"]}
              </b>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

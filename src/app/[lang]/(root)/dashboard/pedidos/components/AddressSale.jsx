"use client";
import { useEffect, useState } from "react";

export default function AddressSale({ address, lang }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // console.log(address);
  return (
    <div>
      {address.length === 0 && (
        <p className="py-6">No haz seleccionado dirección</p>
      )}
      <p className="text-primaryBlue">
        <b>{lang.addresses.company}:</b> {address.officeName}
      </p>
      <p className="text-primaryBlue">
        <b>{lang.addresses.address}:</b> {address.address}
        {address.postalCode && (
          <span>
            , CP.
            {address.postalCode}.
          </span>
        )}
      </p>
      {address.city && (
        <p className="text-primaryBlue">
          <b>{lang.addresses.city}:</b> {address.city}.
        </p>
      )}
      {address.state && (
        <p className="text-primaryBlue">
          <b>{lang.addresses.state}:</b> {address.state}.
        </p>
      )}
      {address.country && (
        <p className="text-primaryBlue">
          <b>{lang.addresses.country}:</b> {address.country}.
        </p>
      )}
    </div>
  );
}

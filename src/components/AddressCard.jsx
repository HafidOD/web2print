"use client";
import useAddress from "@/app/hooks/use-address";
// import { useState } from "react";

export default function AddressCard({ address }) {
  const addressState = useAddress();

  // console.log(address);
  // const [direccionSeleccionada, setDireccionSeleccionada] = useState("");

  const onAddAddress = (event) => {
    addressState.addAddress(address);
    // console.log(address);
  };

  return (
    <li
      key={address.id}
      className="flex justify-between py-3 cursor-pointer gap-x-6"
    >
      <label htmlFor={`address-${address.id}`} className="cursor-pointer">
        <div className="flex gap-x-4">
          <div className="flex-auto min-w-0">
            <p className="text-sm font-semibold leading-6 text-primaryBlue">
              {address.officeName}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
              {address.address}
            </p>
            {address.city && address.state && address.country ? (
              <p className="text-xs leading-5 text-gray-500 truncate">
                {address.city}, {address.state}, {address.country}
              </p>
            ) : null}
          </div>
        </div>
      </label>
      <input
        type="radio"
        id={`address-${address.id}`}
        name="address"
        value={address.id}
        className="text-white form-radio bg-primaryBlue border-primaryBlue"
        // checked={direccionSeleccionada === addresses.id}
        onChange={onAddAddress}
      />
    </li>
  );
}

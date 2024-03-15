import Link from "next/link";

export default function Card({ item }) {
  return (
    <Link href={`${item.href}`} className="w-full">
      <div className="w-full bg-white rounded-md shadow-lg border-secondGray lg:max-w-sm border-l-6">
        {/* <img
                className="object-contain w-full h-48"
                src={enterprise.logo}
                alt={enterprise.enterpriseName}
              /> */}
        <div className="p-4">
          <h4 className="font-semibold text-center uppercase text-md text-primaryBlue">
            {item.name}
          </h4>
        </div>
      </div>
    </Link>
  );
}

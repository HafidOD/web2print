"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FormLogin({ lang, paramslang }) {
  // console.log(lang);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: `/${paramslang}/dashboard`,
      });

      // console.log(res);
      if (!res?.error) {
        // setLoading(false);
        router.push(`/${paramslang}/dashboard`);
      } else {
        setLoading(false);
        toast.error(lang.error["invalid-email-password"]);
        // setError("Correo o contraseña ");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const handleChange = (event) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    // console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="w-full max-w-2xl ">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        {error && (
          <p className="py-4 mb-6 text-center bg-red-300 rounded">{error}</p>
        )}
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            {/* <label for="email" class="text-sm font-medium">Correo Electrónico</label> */}
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
              className="block w-full p-4 border border-primaryBlue bg-gray-50 sm:text-sm focus:outline-none placeholder:text-primaryBlue placeholder:font-bold"
              placeholder={lang.login.email}
              required={true}
            ></input>
          </div>
          <div>
            {/* <label for="password" class="text-sm font-medium  block mb-2 dark:text-gray-300">Contraseña</label> */}
            <input
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder={lang.login.password}
              className="block w-full p-4 border border-primaryBlue bg-gray-50 sm:text-sm focus:outline-none placeholder:text-primaryBlue placeholder:font-bold"
              required={true}
            ></input>
          </div>
          <div>
            <button
              type="submit"
              style={{ backgroundColor: `${loading ? "#ccc" : "#193761"}` }}
              className="w-full text-white bg-[#193761] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-md px-5 py-2.5 text-center"
              disabled={loading}
            >
              {loading ? (
                <span>{lang.login.authenticating}...</span>
              ) : (
                <span>{lang.login.login}</span>
              )}
            </button>
            <a href={`/${paramslang}/register`} className="text-primaryBlue">
              {lang.login.register}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

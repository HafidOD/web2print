export default function Search() {
  return (
    <form>
      <div class="flex justify-center">
        <div class="relative w-4/5">
          <input
            type="search"
            class="block p-2 w-full z-20 text-sm text-primaryBlue bg-gray-50 rounded-lg border-2 border-gray-300 "
            placeholder="Buscar ..."
          ></input>
          <button
            type="submit"
            class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primaryBlue rounded-e-lg focus:outline-none "
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

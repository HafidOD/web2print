"use client"
import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ImpresionPage() {
  let [categories] = useState({
    "Tarjetas de Presentación": [
      {
        id: 1,
        title: 'Producto 1',
        count: 5,
      },
      {
        id: 2,
        title: "Producto 2",
        count: 5,
      },
    ],
    "Hojas Membretadas": [
      {
        id: 1,
        title: 'producto 1',
        count: 5,
      },
      {
        id: 2,
        title: 'producto 2',
        count: 5,
      },
    ],
    "Folders": [
      {
        id: 1,
        title: 'producto 1',
        count: 5,
      },
      {
        id: 2,
        title: "producto 2",
        count: 5,
      },
    ],
    "Sobres": [
      {
        id: 1,
        title: 'producto 1',
        count: 5,
      },
      {
        id: 2,
        title: "producto 2",
        count: 5,
      },
    ],
  })

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl p-1 bg-blue-900/20">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-blue-700 shadow text-white'
                    : 'text-blue-700 bg bg-gray-100 hover:text-blue-700'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      {/* <li>&middot;</li> */}
                      <li>{post.count} disponibles</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

import React, { useState, useRef } from 'react'
function ProfilePage() {
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 justify-center px-8 w-full rounded-lg ">
      <div className="h-[100px] py-4">
        <h1 className="font-bold text-2xl px-4 py-4">My Profile</h1>
      </div>
      <div className="flex bg-white rounded border-gray-500 shadow-lg overflow-hidden max-w-5xl justify-center h-[400px]">
        <div className="w-2/3 p-2">
          <form>
            <div className="mx-4 my-4">
              <label htmlFor="" className="block text-sm font-medium ">
                UserName
              </label>
              <input className="px-2 py-1 mt-2 w-full border border-gray-400 rounded outline-none  " />
            </div>

            <div className="mx-4 my-4">
              <label htmlFor="" className="block text-sm font-medium ">
                Email
              </label>
              <input className="px-2 py-1 mt-2 w-full border border-gray-400 rounded outline-none  " />
            </div>

            <div className="mx-4 my-4">
              <label htmlFor="" className="block text-sm font-medium ">
                Fist name
              </label>
              <input className="px-2 py-1 mt-2 w-full border border-gray-400 rounded outline-none  " />
            </div>

            <div className="mx-4 my-4">
              <label htmlFor="" className="block text-sm font-medium ">
                Last name
              </label>
              <input className="px-2 py-1 mt-2 w-full border border-gray-400 rounded outline-none  " />
            </div>

            <div className="flex justify-end space-x-2 mt-4 mr-2">
              <div>
                <button className="font-medium text-white bg-red-500 rounded-md px-4 py-2 hover:bg-red-600">
                  Cancel
                </button>
              </div>
              <div>
                <button className="font-medium bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="border-l-4 border-gray-300"></div>
        <div className="w-1/3 bg-blue-100 flex items-center justify-center">
          <div className="mb-4">
            {image ? (
              <img src={image} alt="Image" className="max-w-full h-auto rounded-lg" />
            ) : (
              <svg
                enableBackground="new 0 0 15 15"
                viewBox="0 0 15 15"
                x="0"
                y="0"
                className="shopee-svg-icon BJDAci icon-headshot w-12 h-12 text-gray-500"
              >
                <g>
                  <circle
                    cx="7.5"
                    cy="4.5"
                    fill="none"
                    r="3.8"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                  ></circle>
                  <path
                    d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                  ></path>
                </g>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

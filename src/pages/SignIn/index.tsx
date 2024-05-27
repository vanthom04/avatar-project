import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

import config, { supabase } from '~/config'
import Spinner from '~/components/Spinner'
import RecoverPasswordModal from './RecoverPasswordModal'

function SignIn() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassWord] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleOpenModal = () => setIsOpenModal(!isOpenModal)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const togglePasswordVisibility = () => {
    setShowPassWord(!showPassword)
  }

  const onSubmit = async (values: FieldValues) => {
    const { email, password } = values
    try {
      setLoading(true)
      const { error, data } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      if (data.user) {
        reset()
        toast.success('Login successfully')
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex w-full h-screen items-center justify-center bg-gray-200 px-5 md:px-0">
        <div className="w-[900px] h-[500px] m-auto bg-white p-6 rounded-3xl flex flex-row gap-3 shadow-xl">
          <div className="rounded-xl p-2 m-auto hidden md:block ">
            <img src="./assets/avatar-customize.png" className="rounded-lg shadow-lg" />
          </div>
          <form className="bg-white w-full p-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1 className="text-3xl font-medium mb-2 mt-2">Sign in here!</h1>
              <p>Please sign in to generate Custom Avatars!</p>
            </div>
            <div className="mt-7">
              <div className="flex flex-row">
                <label className="block mb-1 font-medium">Email</label>
                <p className="ml-1 text-red-500">*</p>
              </div>
              <input
                disabled={loading}
                type="text"
                autoComplete="off"
                spellCheck="false"
                className="w-full border border-gray-400 px-3 py-2 rounded-lg mb-3 outline-none appearance-none"
                placeholder="Email"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <div className="flex items-center">
                  <p className="text-red-500 italic text-sm">Email is required!</p>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="flex flex-row">
                <label className="block mb-1 font-medium">Password</label>
                <p className="ml-1 text-red-500">*</p>
              </div>
              <div className="relative">
                <input
                  disabled={loading}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  spellCheck="false"
                  className="w-full border border-gray-400 px-3 py-2 rounded-lg mb-1 outline-none appearance-none"
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
                <div className="flex justify-end ">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5 text-gray-700" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5 text-gray-700" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <div className="flex items-center">
                  <p className="text-red-500 italic text-sm">Password is required!</p>
                </div>
              )}
            </div>
            <p
              className="flex justify-end text-blue-500 cursor-pointer hover:underline"
              onClick={handleOpenModal}
            >
              Forgot password
            </p>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center text-[17px] p-2 border border-blue-500 mt-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              {loading ? <Spinner className="w-5 h-6" /> : 'Sign in'}
            </button>
            <div className="mt-3 flex flex-row justify-center">
              <span>Don't have an account?</span>
              <Link
                to={config.routes.signUp}
                className="text-blue-500 ml-1 cursor-pointer hover:underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <RecoverPasswordModal isOpen={isOpenModal} onClick={handleOpenModal} />
    </>
  )
}

export default SignIn

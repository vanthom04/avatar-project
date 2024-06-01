import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'

import { useRouter } from '~/hooks'
import config, { supabase } from '~/config'
import Spinner from '~/components/Spinner'

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (values: FieldValues) => {
    const { fullName, email, password } = values
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { full_name: fullName }
        }
      })
      if (error) throw error

      if (data.user) {
        toast.success('Sign up successfully')
        router.push(config.routes.signIn)
        reset()
      }
    } catch (error) {
      console.error(error)
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="w-full h-screen flex items-center bg-gray-100 p-3">
      <div className="w-[920px] h-[520px] m-auto bg-white p-3 rounded-3xl flex flex-row justify-center gap-3 shadow-xl">
        <form
          className="bg-white w-full flex flex-col justify-center select-none p-4 sm:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h1 className="text-3xl font-medium mb-2">Sign up here!</h1>
            <p className=" text-[#72747c] text-[15px] mb-6">
              Get started with our quick and easy registration process.
            </p>
          </div>
          <div>
            <div className="mb-2.5">
              <div className="flex flex-row">
                <label className="block mb-1 font-medium">Full name</label>
                <p className="ml-1 text-red-500">*</p>
              </div>
              <input
                disabled={loading}
                spellCheck="false"
                autoComplete="off"
                type="text"
                className="w-full border border-gray-400 px-3 py-2 rounded-lg outline-none appearance-none"
                placeholder="Michael Jackson"
                {...register('fullName', { required: true })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs italic">Full name is required!</p>
              )}
            </div>

            <div className="mb-2.5">
              <div className="flex flex-row">
                <label className="block mb-1 font-medium">Email</label>
                <p className="ml-1 text-red-500">*</p>
              </div>
              <input
                disabled={loading}
                autoComplete="off"
                type="text"
                className="w-full border border-gray-400 px-3 py-2 rounded-lg outline-none"
                placeholder="example@gmail.com"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="text-red-500 text-xs italic">Email is required!</p>}
            </div>

            <div className="relative">
              <div className="flex flex-row">
                <label className="block mb-1 font-medium">Password</label>
                <p className="ml-1 text-red-500">*</p>
              </div>
              <div className="flex items-center border border-gray-400 rounded-lg">
                <input
                  disabled={loading}
                  autoComplete="off"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 rounded-lg outline-none"
                  placeholder="Must have at least 6 characters"
                  {...register('password', { required: true })}
                />
                <div className="pr-2" onClick={togglePassword}>
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5 text-gray-700" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5 text-gray-700" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">Password is required!</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center text-[17px] py-2 border border-blue-500 mt-5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition-transform duration-300"
          >
            {loading ? <Spinner className="w-6 h-6 m-auto" /> : 'Sign up'}
          </button>
          <div className="mt-3 flex flex-row justify-center">
            <span>Already have an account?</span>
            <Link
              to={config.routes.signIn}
              className="text-blue-500 ml-1 cursor-pointer hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
        <div className="w-full hidden md:block rounded-xl p-2 m-auto">
          <img src="/assets/avatar-customize.webp" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  )
}
export default SignUpPage

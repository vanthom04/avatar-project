import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { CiMail, CiUser } from 'react-icons/ci'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline, IoKeyOutline } from 'react-icons/io5'

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
    <div className="flex justify-center h-screen items-center w-full">
      <form
        className="px-8 pt-6 pb-6 mb-4 w-96 bg-[#eff1f2] rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl mb-4 text-center font-bold text-[#0e64f1]">Sign up</h2>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">Full name</label>
          <div className="flex items-center bg-white rounded-lg pl-2">
            <div>
              <CiUser color="gray" size={20} />
            </div>
            <input
              autoComplete="off"
              disabled={loading}
              placeholder="Enter your full name"
              type="text"
              className="appearance-none w-full py-2 px-3 text-gray-700 rounded-lg outline-none"
              {...register('fullName', { required: true })}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs italic mt-2">Full name is required!</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">Email</label>
          <div className="flex items-center bg-white rounded-lg pl-2">
            <div>
              <CiMail color="gray" size={20} />
            </div>
            <input
              autoComplete="off"
              disabled={loading}
              placeholder="Enter your email "
              type="text"
              className="appearance-none w-full py-2 px-3 text-gray-700 rounded-lg outline-none"
              {...register('email', { required: true })}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs italic mt-2">Email is required!</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">Password</label>
          <div className="flex items-center bg-white rounded-lg pl-2">
            <div>
              <IoKeyOutline color="gray" size={20} />
            </div>
            <input
              autoComplete="off"
              disabled={loading}
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              className="appearance-none w-full py-2 px-3 text-gray-700 rounded-lg outline-none"
              {...register('password', { required: true })}
            />
            <div className="pr-2" onClick={togglePassword}>
              {showPassword ? (
                <IoEyeOutline color="gray" size={20} />
              ) : (
                <IoEyeOffOutline color="gray" size={20} />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs italic mt-2">Password is required!</p>
          )}
        </div>
        <button className="py-2 px-4 mb-2 w-full text-center bg-[#0e64f1] text-white rounded-lg justify-center flex">
          {loading ? <Spinner className="w-5 h-5" /> : 'Sign up'}
        </button>
        <p className="text-center text-sm">
          Already have an account?
          <Link to={config.routes.signIn} className="ml-1 text-[#0e64f1]">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
export default SignUpPage

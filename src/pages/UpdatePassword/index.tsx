import { useState } from 'react'
import toast from 'react-hot-toast'
import { FieldValues, useForm } from 'react-hook-form'
import { IoEyeOutline, IoKeyOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'

import config, { supabase } from '~/config'
import { useRouter, useUser } from '~/hooks'
import Spinner from '~/components/Spinner'

function UpdatePassword() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const router = useRouter()
  const { accessToken } = useUser()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (values: FieldValues) => {
    if (!accessToken) return toast.error('No access token!')
    if (values.password === values.confirmPassword) {
      try {
        setLoading(true)
        const { error } = await supabase.auth.updateUser({ password: values.password })
        if (error) throw error

        reset()
        toast.success('Update password successfully')
        router.push(config.routes.myAvatars)
      } catch (error) {
        toast.error((error as Error).message)
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="w-[400px] bg-[#eff1f2] p-5 rounded-xl">
        <h2 className="mb-5 text-center text-[#0e64f1] text-3xl font-medium">Update password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex items-center bg-white rounded-lg p-1">
              <div className="ml-2">
                <IoKeyOutline color="gray" size={20} />
              </div>
              <input
                disabled={loading}
                autoComplete="off"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="**********"
                spellCheck="false"
                className="w-full p-2 rounded-lg outline-none"
                {...register('password', { required: true })}
              />
              <div onClick={togglePasswordVisibility} className="mr-2">
                {showPassword ? (
                  <IoEyeOutline color="gray" size={20} />
                ) : (
                  <IoEyeOffOutline color="gray" size={20} />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 italic text-sm">Password is required!</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-1 font-medium">
              Confirm password
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex items-center bg-white rounded-lg p-1">
              <div className="ml-2">
                <IoKeyOutline color="gray" size={20} />
              </div>
              <input
                disabled={loading}
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="**********"
                spellCheck="false"
                className="w-full p-2 rounded-lg outline-none"
                {...register('confirmPassword', { required: true })}
              />
              <div onClick={toggleConfirmPasswordVisibility} className="mr-2">
                {showConfirmPassword ? (
                  <IoEyeOutline color="gray" size={20} />
                ) : (
                  <IoEyeOffOutline color="gray" size={20} />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 italic text-sm">Confirm password is required!</p>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="mx-auto flex justify-center bg-[#0e64f1] text-white font-medium py-2 px-4 rounded border border-blue-500 w-full mt-4"
          >
            {loading ? <Spinner className="w-5 h-5" /> : 'Update'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword

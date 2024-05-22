import { useState } from 'react'
import toast from 'react-hot-toast'
import { FieldValues, useForm } from 'react-hook-form'
import { CiMail } from 'react-icons/ci'

import { supabase } from '~/config'
import Spinner from '~/components/Spinner'

function RecoverPassword() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: { email: '' } })

  const onSubmit = async (values: FieldValues) => {
    try {
      setLoading(true)
      const redirectTo = import.meta.env.DEV
        ? 'http://localhost:6200/update-password'
        : 'https://avatar-project-psi.vercel.app/update-password'
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, { redirectTo })
      if (error) throw error

      reset()
      toast.success('Successfully, check your mail inbox!')
    } catch (error) {
      console.log(error)
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="w-[400px] bg-[#eff1f2] p-5 rounded-xl">
        <h2 className="mb-5 text-center text-[#0e64f1] text-3xl font-medium">Recover password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <p className="mb-4 font-normal italic">
              Enter your email address and we will send you a link to reset your password
            </p>
            <div className="flex items-center gap-3 bg-white rounded-lg p-1">
              <div className="pl-2">
                <CiMail color="gray" size={20} />
              </div>
              <input
                disabled={loading}
                id="email"
                type="email"
                autoComplete="off"
                placeholder="Enter your email address"
                className="w-full outline-none pt-2 pb-2 mr-2"
                {...register('email', { required: true })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 italic mt-1 ml-1">Email is required!</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#007bff] text-white w-full p-2 rounded-lg font-semibold hover:opacity-85 flex justify-center"
          >
            {loading ? <Spinner className="w-5 h-5" /> : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RecoverPassword

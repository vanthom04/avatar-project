import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { IoMdClose } from 'react-icons/io'

import { useRouter, useUser } from '~/hooks'
import { useQueryTemplates } from '~/queries'
import Spinner from '~/components/Spinner'
import TemplateItem from '~/components/TemplateItem'

interface NewAvatarModalProps {
  isOpen: boolean
  onClose: () => void
}

const NewAvatarModal: React.FC<NewAvatarModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { accessToken } = useUser()
  const { data: templates, isLoading } = useQueryTemplates(accessToken ?? '')

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/80 backdrop-blur-sm fixed z-50 inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] lg:w-[65%] h-full max-h-[95vh] p-8 drop-shadow-md rounded-lg border border-neutral-700 bg-white focus:outline-none z-50 overflow-hidden">
          <Dialog.Title className="text-3xl font-semibold p-1">New avatar</Dialog.Title>
          <div className="w-full h-full flex flex-col gap-y-4">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner className="w-12 h-12" />
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 overflow-y-auto p-1 my-8">
                {templates?.map((template) => (
                  <TemplateItem
                    key={template.id}
                    data={template}
                    onClick={(id) => router.push('/custom-avatar/create/' + id)}
                  />
                ))}
              </div>
            )}
          </div>
          <Dialog.Close asChild>
            <button
              disabled={isLoading}
              className={clsx(
                'p-1.5 text-neutral-900 absolute top-[16px] right-[16px] inline-flex appearance-none items-center justify-center rounded-full focus:outline-none hover:bg-neutral-300 transition-colors duration-300',
                { 'cursor-not-allowed hover:bg-transparent': isLoading }
              )}
              onClick={onClose}
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default NewAvatarModal
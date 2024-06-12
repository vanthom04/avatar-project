import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { IoMdClose } from 'react-icons/io'

import { useRouter } from '~/hooks'
import TemplateItem from '~/components/TemplateItem'
import { useGlobalContext } from '~/context'

interface NewAvatarModalProps {
  isOpen: boolean
  onClose: () => void
}

const NewAvatarModal: React.FC<NewAvatarModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()

  const [state] = useGlobalContext()
  const { templates } = state

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/80 backdrop-blur-sm fixed z-50 inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] lg:w-[65%] h-full max-h-[95vh] p-8 drop-shadow-md rounded-lg border border-neutral-700 bg-white focus:outline-none z-50 overflow-hidden animate-fade-in">
          <Dialog.Title className="text-xl md:text-3xl font-semibold p-1">New avatar</Dialog.Title>
          <div className="w-full h-full flex flex-col gap-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 overflow-y-auto p-1 my-8">
              {templates?.map((template) => (
                <TemplateItem
                  key={template.id}
                  data={template}
                  onClick={(id) => router.push('/custom-avatar/create/' + id)}
                />
              ))}
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className={clsx(
                'p-1.5 text-neutral-900 absolute top-[16px] right-[16px] inline-flex appearance-none items-center justify-center rounded-full focus:outline-none hover:bg-neutral-300 transition-colors duration-300'
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

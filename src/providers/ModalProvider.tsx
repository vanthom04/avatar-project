import { useEffect, useState } from 'react'
import TemplateModal from '~/components/TemplateModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <TemplateModal />
    </>
  )
}

export default ModalProvider

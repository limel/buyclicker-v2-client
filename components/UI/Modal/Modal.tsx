import { createPortal } from 'react-dom'
import type { ModalProps } from './Modal.types'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function Modal({
  children,
  selector = 'modal',
  openModal,
  setOpenModal,
}: ModalProps) {
  const ref = useRef<Element | null>(null)

  useEffect(() => {
    ref.current = document.getElementById(selector)
    if (openModal) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '8px'
      document.querySelector('header')!.style.paddingRight = '8px'
    }
  }, [selector, openModal])

  if (!ref.current) return null
  return createPortal(
    <AnimatePresence>
      {openModal && (
        <motion.div
          key='modal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, paddingRight: 0 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            paddingRight: { duration: 0 },
          }}
          className='modal-wrapper'
          onClick={() => {
            setOpenModal(false)
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0'
            document.querySelector('header')!.style.paddingRight = '0'
          }}
        >
          <motion.div
            key='modal-body'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className='modal-body'
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <button
              className='absolute top-6 right-6 z-50 focus:outline-none'
              onClick={() => {
                setOpenModal(false)
                document.body.style.overflow = 'auto'
                document.body.style.paddingRight = '0'
                document.querySelector('header')!.style.paddingRight = '0'
              }}
              aria-label='close modal'
            >
              <svg className='w-5 h-5'>
                <use href='/sprite.svg#cross' />
              </svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    ref.current
  )
}

export default Modal

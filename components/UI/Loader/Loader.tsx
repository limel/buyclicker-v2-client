import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { createPortal } from 'react-dom'

function Loader({ isPending }: { isPending: boolean }) {
  const ref = React.useRef<Element | null>(null)

  React.useEffect(() => {
    ref.current = document.getElementById('loader')
  }, [])

  if (!ref.current) return null
  return createPortal(
    <AnimatePresence>
      {isPending && (
        <motion.div
          className='loader-wrapper'
          key='loader'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          <div className='loader-image'>
            <motion.svg
              key='svg-icon'
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
              className='text-black w-10 h-9'
            >
              <use href='/sprite.svg#logo-icon' />
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    ref.current
  )
}

export default Loader

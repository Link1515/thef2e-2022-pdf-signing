import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import iconCancel from '../assets/images/icons/cancel.png'
import SignArea from './SignArea'
import { getElementContentWidth } from '../utils'

interface Props {
  showModel: boolean
  closeModel: () => void
}

const Model = (props: Props) => {
  const { showModel, closeModel } = props

  const modelBox = useRef<HTMLDivElement>(null)
  const [signAreaWidth, setSignAreaWidth] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (modelBox.current) {
      setSignAreaWidth(getElementContentWidth(modelBox.current))
    }

    return () => {
      document.body.style.overflow = ''
    }
  })

  return (
    <AnimatePresence>
      {showModel ? (
        <motion.div
          className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-primary-selected bg-opacity-40 backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            ref={modelBox}
            className="w-[500px] rounded-lg bg-white p-3 pb-6 shadow-lg"
          >
            <div className="mb-6 text-right">
              <button onClick={closeModel}>
                <img src={iconCancel} alt="cancel" />
              </button>
            </div>
            <SignArea width={signAreaWidth} height={150} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Model

// import { useAppDispatch } from '../hooks/useAppDispatch'
// import TodoButton from './TodoButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from './interface';
import { FaWindowClose } from "react-icons/fa";

const TodoModal = ({ todo, modalOpen, handleModalClose }: {todo: Todo, modalOpen: boolean, handleModalClose: () => void}) => {
  if (!modalOpen) return <></>;
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }
  }
  return (
    <AnimatePresence>
      <div
          onClick={handleModalClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflowX: 'hidden',
            overflowY: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            position: 'relative',
            flexDirection: "column",
            border: "1px solid black",
            borderRadius: "5px",
            maxWidth: "500px",
            margin: "2rem auto",
            backgroundColor: "white",
            padding: "10px",
            gap: 10
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div style={{ 
            display: 'flex',
            borderBottom: '1px solid black',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem',
          }}>
            <h2>{todo.title}</h2>
            <FaWindowClose onClick={handleModalClose} style={{ fontSize: '1.5rem', color: '#E06546' }} />
          </div>
          <div>
            <p>{todo.description}</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TodoModal
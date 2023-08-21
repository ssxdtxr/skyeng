import s from './Modal.module.scss'
import {useContext, useEffect,} from "react";
import {useOutsideClick} from "@/hooks/useClickOutside.tsx";
import {AnimatePresence, motion} from "framer-motion";
import exit from "@/assets/img/exit.svg"
import {ModalContext} from "@/context/ModalContext.ts";


const Modal = () => {
    const {closeModal, isOpen, content} = useContext(ModalContext)

    const ref = useOutsideClick(() => {
        closeModal()
    });

    useEffect(() => {
        isOpen ? document.body.classList.add(s.isOpenModal) : document.body.classList.remove(s.isOpenModal)
    }, [isOpen])

    return (
        <AnimatePresence>
            {
                isOpen &&
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}

                    className={s.back}
                >
                    <div ref={ref} className={s.modal}>
                        <div
                            className={s.close}
                            onClick={closeModal}
                        >
                            <img width={30} height={30} src={exit} alt="exit"/>
                        </div>
                        <div className={s.body}>
                            {content}
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default Modal;
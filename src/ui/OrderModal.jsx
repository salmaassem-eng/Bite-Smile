import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = '', onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }

    return () => {
      if (modal.open) modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      onCancel={(e) => {
        e.preventDefault(); 
        onClose(); 
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

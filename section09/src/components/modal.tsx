"use client";

import { ReactNode, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import { useRouter } from "next/navigation";

//props로 전달받은 컴포넌트를 createPortal을 통해 원하는 HTML위치에 모달로 렌더링 한다.
export default function Modal({ children }: { children: ReactNode }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    modalRef.current?.showModal();
    modalRef.current?.scroll({
      top: 0,
    });
  }, []);

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  if (!modalRoot) return null;
  return createPortal(
    <dialog
      className={style.modal}
      ref={modalRef}
      onClose={() => router.back()}
      onClick={(e) =>
        (e.target as any).nodeName === "DIALOG" ? router.back() : null
      }
    >
      {children}
    </dialog>,
    modalRoot
  );
}

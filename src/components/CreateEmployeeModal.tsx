"use client";

import { useEffect, useRef } from "react";

import { useModalStore } from "@/stores";

import Icon from "./icons";
import CreateEmployeeForm from "./CreateEmployeeForm";

function CreateEmployeeModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isModalOpen, closeModal } = useModalStore();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isModalOpen) dialog.showModal();
    else dialog.close();

    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      className="fixed top-1/2 left-1/2 max-h-[90vh] -translate-1/2 rounded-[10px] bg-transparent backdrop:backdrop-blur-xs"
    >
      {isModalOpen && (
        <div
          onClick={e => e.stopPropagation()}
          className="flex w-[50vw] flex-col gap-9 bg-white px-13 py-10 shadow-lg"
        >
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-gray-300 transition-colors hover:bg-gray-400"
            >
              <Icon iconName="close" color="white" />
            </button>
          </div>

          <CreateEmployeeForm onCancel={closeModal} />
        </div>
      )}
    </dialog>
  );
}

export default CreateEmployeeModal;

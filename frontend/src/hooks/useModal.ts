import { useState } from 'react';

export default function useModal() {
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    return { open, openModal, closeModal };
}

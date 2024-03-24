export type ModalProps = {
  children?: React.ReactNode
  selector?: string
  openModal: boolean
  setOpenModal: (value: boolean) => void
}

"use client";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { TextField } from "@mui/material";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SpecialtyModal = ({ open, setOpen }: TProps) => {
  return (
    <PHModal open={open} setOpen={setOpen} title="Create Specialist">
      <TextField />
    </PHModal>
  );
};

export default SpecialtyModal;

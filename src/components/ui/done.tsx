import { IconButton } from "@chakra-ui/react";
import { PiCheckFatFill, PiCheckFatBold } from "react-icons/pi";

interface DoneProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
  
}

export const Done = ({ value, onChange }: DoneProps) => {
  return (
    <IconButton
      aria-label={value ? "Marquer à faire" : "Marqué comme fait"}
      as={value ? PiCheckFatFill : PiCheckFatBold}
      variant="ghost"
      color={value ? "vert.400" : "grisChaud.400"}
      onClick={(e) => (e.stopPropagation(), onChange(!value))}
      _hover={{ color: "vert.400" }}
    />
  );
};

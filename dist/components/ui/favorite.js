import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from "@chakra-ui/react";
import { GoStar, GoStarFill } from "react-icons/go";
export const Favorite = ({ value, onChange }) => {
    return (_jsx(IconButton, { "aria-label": value ? "Retirer des favoris" : "Ajouter aux favoris", as: value ? GoStarFill : GoStar, variant: "ghost", color: value ? "violet.400" : "violet.400", onClick: (e) => (e.stopPropagation(), onChange(!value)), _hover: { color: "violet.400" } }));
};

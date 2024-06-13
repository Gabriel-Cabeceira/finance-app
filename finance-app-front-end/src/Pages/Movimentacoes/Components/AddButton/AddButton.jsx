import { Button } from "./addButton.styles";
import { IoAdd } from "react-icons/io5";


export default function AddButton({ title, onClick }) {
  return (
    <Button onClick={onClick}>
        <IoAdd className="plusSign"/>
        { title }
    </Button>
  )
}

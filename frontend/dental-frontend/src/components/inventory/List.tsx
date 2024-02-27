import axios from "axios";
import { useEffect, useRef, useState } from "react";

function List() {
  const [toggle, setToggle] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [query, setQuery] = useState("");
  const table = useRef(null);

  const getInventory = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/inventory`);

    setInventory(data);
  };

  useEffect(() => {
    getInventory();
  });

  const exportPDF = () => {
    let element = table.current;
    if (element !== null) {
      savePDF(element, {
        paperSize: "a4",
        margin: "2cm",
        landscape: true,
        fileName: "CurrentInventory",
        scale: 0.5,
      });
    }
  };
}
export default List;

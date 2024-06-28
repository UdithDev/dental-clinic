import { useState, useRef } from "react";
import AddItem from "../components/inventory/AddItem";
import Welcome from "../components/inventory/Welcome";
import ItemForm from "../components/inventory/ItemForm";
import List from "../components/inventory/List";

function Inventory() {
  const [toggle, setToggle] = useState(false);
  const printRef = useRef();

  return (
    <div className="flex flex-col">
      <div className="inline-block min-w-full">
        <Welcome />
        <div className="mb-10" />
        <List />
        <div className="mb-10" />
        <AddItem />
        <button
          onClick={() => setToggle(!toggle)}
          type="button"
          className="text-sm font-medium bg-accent px-2 w-24 h-8 rounded-full text-white my-4"
        >
          Add Item
        </button>
        <div ref={printRef} className={`${toggle ? "" : "hidden"}`}>
          <ItemForm />
        </div>
      </div>
    </div>
  );
}

export default Inventory;

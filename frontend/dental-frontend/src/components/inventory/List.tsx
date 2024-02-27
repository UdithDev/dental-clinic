import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";


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

  const searchItems = (inventory, query) => {
    return inventory.filter((item) =>
      Object.values(item).join("").toLowerCase().includes(query.toLowerCase)
    );
  };
  const filterdItems = searchItems(inventory, query);

  return (
    <>
      <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between py-4">
        <h1 className="font-semibold text-2xl text-accent">
          Currrent Inventory
        </h1>
        <div className="flex items-center justify-center gap-4">
          <h1 className="font-medium text-accent">Search</h1>
          <input
            title="tt"
            type="text"
            className="border-2 px-2 py-1 text-sm rounded-full border-accent"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-auto max-h-[800px] rounded-md">
        <table
          ref={table}
          className="min-w-full text-center text-sm font-light bg-pearlWhite/30 rounded-md border-separate"
        >
          <thead className="bg-accent font-medium text-white">
            <tr className="">
              <th className={`px-6 py-4 ${toggle ? "hidden" : ""}`}>ID</th>
              <th
                className={`px-6 ${
                  toggle ? "py-7" : "py-4"
                } flex items-center justify-center`}
              >
                <ArrowLeftIcon
                  onClick={() => setToggle(!toggle)}
                  className={`w-5 mr-2 cursor-pointer ${
                    toggle ? "hidden" : ""
                  }`}
                />
                <ArrowRightIcon
                  onClick={() => setToggle(!toggle)}
                  className={`w-6 p-1 mr-2 cursor-pointer ${
                    toggle ? "" : "hidden"
                  }`}
                />
                Item Name
              </th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Serial Number</th>
              <th className="px-6 py-4">Vendor Details</th>
              <th className="px-6 py-4">Item Location</th>
              <th className="px-6 py-4">Expiry Date</th>
              <th className="px-6 py-4">Days Until Expiration</th>
              <th className="px-6 py-4">Quantity Available</th>
              <th className="px-6 py-4">Minimum Stock</th>
              <th className="px-6 py-4">Modify</th>
            </tr>
          </thead>
          {!query &&
            inventory.map((item) => (
              <ListItem collapse={toggle} key={item._id} {...item} />
            ))}
          {query &&
            filterdItems.map((item) => (
              <ListItem collapse={toggle} key={item._id} {...item} />
            ))}
        </table>
      </div>
      <div className="flex items-center justify-center text-sm font-medium bg-accent px-2 w-40 h-8 rounded-full text-white my-3">
        <button onClick={exportPDF} type="button">
            Download as a PDF
        </button>
      </div>
    </>
  );
}
export default List;

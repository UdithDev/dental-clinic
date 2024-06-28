import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { InventoryItem } from "../../@types";
import { useTokenAsBearer } from "../../utils/useToken";
import useUser from "../../hooks/useUser";
import { savePDF } from "@progress/kendo-react-pdf";

function List() {
  const user = useUser();
  const [toggle, setToggle] = useState(true);
  const [inventory, setInventory] = useState<Array<InventoryItem>>();
  const [query, setQuery] = useState("");
  const table = useRef(null);

  const getInventory = async () => {
    const url = `${import.meta.env.VITE_API}/inventory`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: useTokenAsBearer(user?.user?.token!),
      },
    });

    setInventory(data);
  };

  useEffect(() => {
    if (user?.user && !inventory) {
      getInventory()
        .then(() => {})
        .catch((err) => console.error(err));
    }
  }, [user, inventory]);

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

  const searchItems = (inventory: InventoryItem[], keyword: string) => {
    // Provides the inventory and the keyword to search.
    return inventory.filter((item) =>
      Object.values(item).join("").toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const filterdItems = searchItems(inventory ? inventory : [], query);

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
            inventory?.map((item) => (
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

import { PencilIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListItem({
  _id,
  item__name,
  sku,
  serial_number,
  vendor_details,
  item_location,
  expiry_date,
  quantity_available,
  minimum_stock,
  collapse,
}) {
  const [daysUntilExpiration , setDateUntilExpiration]:any = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      const response: any = await axios.delete(
        `${import.meta.env.VITE_API}/inventory/${_id}`
      );
      alert(response.data?.success);
      setIsDeleted(true);
    }
  };

  useEffect(() => {
    const calculateDaysUntilExpiration = () => {
      const today:any = new Date();
      const expiration :any = new Date(expiry_date);
      const difference = expiration - today;
      const days:any = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDateUntilExpiration(days);
    };

    calculateDaysUntilExpiration();
  }, [expiry_date]);

  const deleteAlert = () => {
    return (
      <tr className="fixed flex items-center justify-center bottom-2 left-5 py-2 px-10 gap-2 bg-white border-[1px] text-red-600 border-red-600">
        <td className="font-semibold">Item deleted</td>
      </tr>
    );
  };

  const email = "daveudith@gmail.com";

  useEffect(() => {
    const sendEmail = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API}/inventory/send-email`, {
          item__name,
          sku,
          email,
        });
      } catch (err) {
        console.log("Error sending email", err);
      }
    };

    if (daysUntilExpiration !== null && daysUntilExpiration <= 7) {
      sendEmail();
    }
  }, [daysUntilExpiration, item__name, sku]);

  return (
    <tbody className="">
      <tr className="border-b-[1px] border-black/10">
        <td
          className={`whitespace-nowrap px-4 py-4 font-medium ${
            collapse ? "hidden" : ""
          }`}
        >
          {_id}
        </td>

        <td className="px-4  py-4">{item__name}</td>
        <td>{sku}</td>
        <td>{serial_number}</td>
        <td>{vendor_details}</td>
        <td>{item_location}</td>
        <td>{expiry_date.substring(0, 10)}</td>
        <td>
          {daysUntilExpiration < 7 ? (
            <p className="text-red-600 font-bold">
              {daysUntilExpiration <= 0 ? (
                <span>Expired</span>
              ) : (
                <span>{daysUntilExpiration} Days left</span>
              )}
            </p>
          ) : (
            <p>{daysUntilExpiration}Days Left</p>
          )}
        </td>
        <td>{quantity_available}</td>
        <td>{minimum_stock}</td>
        <td>
          <div className="flex items-center justify-center gap-3">
            <Link to={`/inventory/update/${_id}`}>
              <PencilIcon className="w-4 hover:text-accent cursor-pointer" />
            </Link>

            <TrashIcon
              onClick={handleDelete}
              className="w-4 hover:text-accent cursor-pointer"
            />
          </div>
        </td>
      </tr>
      {isDeleted && deleteAlert()}
    </tbody>
  );
}

export default ListItem;

import { PencilIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTokenAsBearer } from "../../utils/useToken";
import useUser from "../../hooks/useUser";
import { PiProhibit } from "react-icons/pi";

interface ListItemProps {
  _id: string;
  item_name: string;
  sku: string;
  serial_number: string;
  vendor_details: string;
  item_location: string;
  expiry_date: string;
  quantity_available: number;
  minimum_stock: number;
  collapse: boolean;
}

function ListItem({
  _id,
  item_name,
  sku,
  serial_number,
  vendor_details,
  item_location,
  expiry_date,
  quantity_available,
  minimum_stock,
  collapse,
}: ListItemProps) {
  const [daysUntilExpiration, setDateUntilExpiration] = useState<number>(0);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const user = useUser();

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API}/inventory/${_id}`,
        {
          headers: {
            Authorization: useTokenAsBearer(user?.user?.token!),
          },
        }
      );
      alert(response.data?.success);
      setIsDeleted(true);
    }
  };

  useEffect(() => {
    const calculateDaysUntilExpiration = () => {
      const today = new Date();
      const expiration = new Date(expiry_date);
      const difference = expiration.getTime() - today.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
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
          item_name,
          sku,
          email,
        });
      } catch (err) {
        console.log("Error sending email", err);
      }
    };

    if (daysUntilExpiration !== null && daysUntilExpiration <= 7 && 1 > 2) {
      sendEmail();
    }
  }, [daysUntilExpiration, item_name, sku]);

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

        <td className="px-4  py-4">{item_name}</td>
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
            <p>{daysUntilExpiration} Days Left</p>
          )}
        </td>
        <td>{quantity_available}</td>
        <td>{minimum_stock}</td>
        <td>
          <div className="flex items-center justify-center gap-3">
            {!(user?.user?.role === "INTERN") ? (
              <>
                <Link to={`/inventory/update/${_id}`}>
                  <PencilIcon className="w-4 hover:text-accent cursor-pointer" />
                </Link>
                <TrashIcon
                  onClick={handleDelete}
                  className="w-4 hover:text-accent cursor-pointer"
                />
              </>
            ) : (
              <PiProhibit />
            )}
          </div>
        </td>
      </tr>
      {isDeleted && deleteAlert()}
    </tbody>
  );
}

export default ListItem;

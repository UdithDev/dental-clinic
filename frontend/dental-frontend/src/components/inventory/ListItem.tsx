import axios from "axios";
import { useState, useEffect } from "react";

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
  collaspe,
}) {
  const [daysUntilExpiration, setDateUntilExpiration] = useState(null);
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
      const today = new Date();
      const expiration = new Date(expiry_date);
      const difference = expiration - today;
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
  
}

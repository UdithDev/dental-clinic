import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success) {
      setError("");
    }
  }, [success]);

  const [state, setState] = useState({
    item_name: "",
    sku: "",
    serial_number: "",
    vendor_details: "",
    item_location: "",
    expiry_date: "",
    quantity_available: "",
    minimum_stock: "",
  });

  const getItembyId = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/inventory/${id}`
    );

    setState({
      item_name: response?.data?.item_name,
      sku: response?.data?.sku,
      serial_number: response?.data?.serial_number,
      vendor_details: response?.data?.vendor_details,
      item_location: response?.data?.item_location,
      expiry_date: response?.data?.expiry_date,
      quantity_available: response?.data?.quantity_available,
      minimum_stock: response?.data?.minimum_stock,
    });
  };

  useEffect(() => {
    getItembyId();
  }, [id]);

  const handleChange = (item: any) => (e: any) => {
    setState({ ...state, [item]: e.target.value });
  };

  const {
    item_name,
    sku,
    serial_number,
    vendor_details,
    item_location,
    expiry_date,
    quantity_available,
    minimum_stock,
  } = state;

  const handleSubmt = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await axios.put(
        `${import.meta.env.VITE_API}/inventory/${id}`,
        {
          item_name,
          sku,
          serial_number,
          vendor_details,
          item_location,
          expiry_date,
          quantity_available,
          minimum_stock,
        }
      );

      setSuccess(response);
      navigate("/inventory");
    } catch (err: any) {
      setError(err.response?.data?.error);
    }
  };

  return (
    <form
      onChange={() => setSuccess("")}
      onSubmit={handleSubmt}
      className="w-full lg:max-w-2xl bg-pearlWhite/30 p-5 rounded-lg"
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="item-name"
          >
            Item Name
          </label>
          <input
            onChange={handleChange("item_name")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="item-name"
            type="text"
            placeholder="Face Masks"
            value={state.item_name}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="sku"
          >
            SKU
          </label>
          <input
            onChange={handleChange("sku")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="sku"
            type="text"
            placeholder="XYZ12345"
            value={state.sku}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="serial-no"
          >
            Serial No
          </label>
          <input
            onChange={handleChange("serial_number")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="serial-no"
            type="number"
            placeholder="394857739"
            value={state.serial_number}
          />
          <p className="text-gray-600 text-xs italic">
            Serial Number must be a unique set of numbers for each item
          </p>
        </div>
      </div>
      <div className="felx flex-wrap -mx-3 md:mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="vendor-details"
          >
            Vendor Details
          </label>
          <input
            onChange={handleChange("vendor_details")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="vendor-details"
            type="text"
            placeholder="Asprin Inc."
            value={state.vendor_details}
          />
        </div>
      </div>

      
    </form>
  );
}
export default UpdateItem;

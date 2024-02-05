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


  
}
export default UpdateItem;

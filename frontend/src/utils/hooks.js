import { useState } from "react";

export const useFormChange = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetValues,
  };
};

export const useQtyChange = (initialValue, callback) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrease = () => {
    setValue(value + 1);
    if (callback) {
      callback(value + 1);
    }
  };

  const handleDecrease = () => {
    setValue(value - 1);
    if (callback) {
      callback(value - 1);
    }
  };

  return {
    value,
    handleIncrease,
    handleDecrease,
  };
};

import { useState } from "react";

export const useFormChange = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [changed, setChanged] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setChanged(true);
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  const resetChanged = () => setChanged(false);

  return {
    values,
    handleChange,
    resetValues,
    changed,
    resetChanged,
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

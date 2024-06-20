import { useState } from "react";

export const useForm = (initialForm) => {
  const [form, setForm] = useState(initialForm);
  const [errorForm, setErrorForm] = useState(initialForm);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleErrorForm = (fieldError, message) => {
    setErrorForm({ ...errorForm, [fieldError]: message });
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const resetErrorForm = () => {
    setErrorForm(initialForm);
  };

  return {
    form,
    errorForm,
    handleInputChange,
    handleErrorForm,
    resetForm,
    resetErrorForm,
  };
};

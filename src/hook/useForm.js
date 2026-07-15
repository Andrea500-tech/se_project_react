import { useState } from "react";
import { validateField } from "../utils/validation"; // import your field-level validator

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  function handleChange(evt) {
    const { name, value } = evt.target;

    // update values
    setValues((prev) => ({ ...prev, [name]: value }));

    // run validation for this field
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  }
  // Add reset function
  function reset(newValues = defaultValues) {
    setValues(newValues);
    setErrors({});
  }

  return { values, errors, setValues, handleChange, reset };
}

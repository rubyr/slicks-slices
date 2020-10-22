import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  const updateValues = (e) => {
    let { value } = e.target;
    if (e.target.type === 'number') value = parseFloat(value);
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  return { values, updateValues };
};

export default useForm;

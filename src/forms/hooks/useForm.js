import { useCallback, useState } from "react";
import Joi from "joi";

export default function useForm(initialForm, schema, handleSubmit) {
  const [data, setData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [fieldData, setFieldData] = useState({});


  const validateProperty = useCallback(
    (name, value) => {
      let joiSchema = Joi.object({ [name]: schema[name] });
      let { error } = joiSchema.validate({ [name]: value });
      return error ? error.details[0].message : null;
    },
    [schema]
  );

  const handleChange = useCallback(
    (e) => {
      let value = e.target.value;
      let name = e.target.name;

      const errorMessage = validateProperty(name, value);

      if (errorMessage) {
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      } else {
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });
      }
      setData((prev) => ({ ...prev, [name]: value }));
    },
    [validateProperty]
  );

  const handleChangeCheckBox = useCallback((e) => {
    let value = e.target.checked;
    let name = e.target.name;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const joiSchema = Joi.object(schema);
    const { error } = joiSchema.validate(data);
    if (error) {

      return false;
    }
    return true;
  }, [schema, data]);


  const handleReset = useCallback(() => {
    setData(initialForm);
    setErrors({});
  }, [initialForm]);
  const handleResetForEdit = useCallback(() => {
    setFieldData({})
  }, [fieldData]);


  // const onSubmit = useCallback(() => {
  //   handleSubmit(data);
  // }, [data]);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    handleSubmit(data);
  }, [data, handleSubmit]);


  return {
    data,
    errors,
    setData,
    handleChange,
    handleChangeCheckBox,
    validateForm,
    handleReset,
    onSubmit,
    fieldData,
    handleResetForEdit,
    setFieldData,
  };
}
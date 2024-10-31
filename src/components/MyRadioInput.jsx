"use client";
import { useField } from "formik";

const MyRadioInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <input className="peer hidden" type="radio" {...field} {...props} />
      <label
        htmlFor={props.id}
        className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600"
      >
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyRadioInput;

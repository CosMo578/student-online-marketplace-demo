"use client";
import { useField } from "formik";

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div>
      <input
        className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
        id="checkbox"
        type="checkbox"
        {...field}
        {...props}
      />
      <label
        className="ms-2 text-sm font-medium text-gray-900"
        htmlFor="checkbox"
      >
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;

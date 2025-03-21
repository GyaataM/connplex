import { useField } from "formik";
import ReactQuill from "react-quill";

const ReactQuillField = ({ name, ...props }: any) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: any) => {
    helpers.setValue(value);
  };

  return (
    <>
      <ReactQuill
        id={name}
        value={field.value || ""}
        onChange={handleChange}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 font-medium mb-2">{meta.error}</div>
      )}
    </>
  );
};

export default ReactQuillField;

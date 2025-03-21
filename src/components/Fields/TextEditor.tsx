import { useField } from "formik";
import ReactQuill, { ReactQuillProps } from "react-quill";

interface ReactQuillFieldProps extends Omit<ReactQuillProps, "onChange" | "value"> {
  name: string;
}

const ReactQuillField: React.FC<ReactQuillFieldProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField<string>(name);

  const handleChange = (value: string) => {
    helpers.setValue(value);
  };

  return (
    <>
      <ReactQuill id={name} value={field.value || ""} onChange={handleChange} {...props} />
      {meta.touched && meta.error && <div className="text-red-500 font-medium mb-2">{meta.error}</div>}
    </>
  );
};

export default ReactQuillField;

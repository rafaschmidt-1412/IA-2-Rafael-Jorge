const InputGroup = ({ type, placeholder, name, value, onChange, label, min, step, accept }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text">{label}</span>
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        accept={accept}
      />
    </div>
  );
};

export default InputGroup;
import { type } from "@testing-library/user-event/dist/type";

const InputGroup = ({type, placeholder, name, onChange, label }) =>{
    return (
        <div className="input-group mb-3">
            <span className="input-group-text">{label}</span>
            <input
                className="form-control"
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
        </div>
    );
}

export default InputGroup;
import PropTypes from 'prop-types';

const Input = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  error,
  required = false,
  className = '',
  disabled = false
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      />
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
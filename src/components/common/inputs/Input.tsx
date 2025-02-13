import { InputType } from "@/models/InputType"

const Input = (prop: InputType) => {
  return (
    <input
      value={prop.value}
      type={prop.type}
      disabled={prop.disabled ? prop.disabled : false}
      onChange={prop.onChange}
      className={`bg-grey border border-dark-grey px-3 rounded-md ${prop.className}`}
      placeholder={prop.placeholder}
    />
  )
}
export default Input
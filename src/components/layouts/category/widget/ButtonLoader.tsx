import Spinner from "react-spinkit";

const ButtonLoader = (
  {color = "white"}: {color?: string}
) => {
  return (
    <Spinner
      color={color}
      name="circle"
      className="w-6 h-6"
    />
  )
}
export default ButtonLoader
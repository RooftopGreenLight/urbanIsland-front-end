import { useState } from "react"

const useSignInput = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    verifiedEmail: "",
    pwd: "",
    repwd: "",
    username: "",
    verifiedCode: "",
    code: "",
  })

  const changeSignupInput = (name, value) => {
    setInputValue({ ...inputValue, [name]: value })
  }

  return { inputValue, changeSignupInput }
}

export default useSignInput

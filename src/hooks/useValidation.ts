import React from 'react'
const useValidation = <T extends any>(data: any) => {
	const [inputs, setInputs] = React.useState<T>(data)
	const [errors, setErrors] = React.useState<any>({})
	const handleOnChange = (text: any, input: any) => {
		setInputs((prevState: any) => ({ ...prevState, [input]: text }))
	}
	const hanldeError = (errorMessage: any, input: any) => {
		setErrors((prevState: any) => ({ ...prevState, [input]: errorMessage }))
	}

	const resetInput = () => {
		setInputs(data)
	}

	return {
		inputs,
		errors,
		handleOnChange,
		hanldeError,
		setErrors,
		setInputs,
		resetInput,
	}
}

export default useValidation
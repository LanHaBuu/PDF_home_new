import React, { createContext, useState } from 'react'

interface children {
    children: React.ReactNode
}

interface Iinput {
    inputCT: string,
    setInputCT: React.Dispatch<React.SetStateAction<string>> | any
}

export const InputContext = createContext<Iinput | null>(null)

const InputProvider: React.FC<children> = ({ children }) => {
    const [inputCT, setInputCT] = useState('')
    const value = {
        inputCT, setInputCT
    }
    return (
        <InputContext.Provider value={value}>{children}</InputContext.Provider>
    )
}

export default InputProvider
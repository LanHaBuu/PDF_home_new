import React, { useContext, useState } from 'react'
import { InputContext } from '../../Context/InputProvider'

const HomeInput: React.FC = () => {
    const [input,setInput] = useState<string>('')
    const value = useContext(InputContext)
    const setInputCt = value?.setInputCT

    const handleAdd = () => {
        setInputCt(input)
    }

    return (
        <div className='input-home'>
            <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}

export default HomeInput
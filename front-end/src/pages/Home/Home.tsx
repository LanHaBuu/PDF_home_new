import React, { useContext, useState } from "react"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import HomeInput from "../../components/Input/HomeInput"
import { InputContext } from "../../Context/InputProvider"
import "./Home.scss"

const Home: React.FC = () => {
	const [pageNumber, setPageNumber] = useState(1)
	const [name, setName] = useState("")
	const value = useContext(InputContext)

	const onDocumentLoadSuccess = () => {
		setPageNumber(1)
	}
	
	return (
		<div className='home-wrapper'>
			<div className='key'>
				<HomeInput />
				<button
					name='google'
					onClick={(e: any) => setName(e.target.name)}
				>
					Google
				</button>
				<button
					name='facebook'
					onClick={(e: any) => setName(e.target.name)}
				>
					Facebook
				</button>
				<button
					name='youtube'
					onClick={(e: any) => setName(e.target.name)}
				>
					Youtube
				</button>
			</div>
			<div className='pdf'>
				{(name || value?.inputCT) && <Document
					file={{ url: `${name}` ? `pdf/${name}` : `pdf/${value?.inputCT}` }}
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page pageNumber={pageNumber} />
				</Document>}
			</div>
		</div>
	)
}

export default Home

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import InputProvider from "./Context/InputProvider"

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<InputProvider><App /></InputProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)

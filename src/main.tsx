import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import './assets/styles/global.scss'
import ModalContextProvider from "@/context/ModalContext.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ModalContextProvider>
                <App/>
            </ModalContextProvider>
        </QueryClientProvider>
    </BrowserRouter>
)

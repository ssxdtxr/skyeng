import {Navigate, Route, Routes} from "react-router-dom";
import Main from "@/pages/Main/Main.tsx";
import NotFound from "@/pages/NotFound/NotFound.tsx";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Main />}/>
      <Route path='/:page' element={<Main />}/>
      <Route path='/not-found' element={<NotFound />}/>
      <Route path='*' element={<Navigate to='/not-found' />}/>
    </Routes>
  )
}

export default App

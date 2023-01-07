
import MyForm from "./Components/Forms/MyForm"
import NavBar from "./Components/NavBar/NavBar"
import { initializeApp } from "firebase/app"
import Respuestas from "./Components/Respuestas/Respuestas"
import { BrowserRouter, Routes , Route,  } from 'react-router-dom'
import Footer from "./Components/Footer/Footer"



const firebaseConfig = {
  apiKey: "AIzaSyCPmkhozMvIyIKrWPLGrhMFj04KhJWOJAI",
  authDomain: "challenge-greydive-53f95.firebaseapp.com",
  projectId: "challenge-greydive-53f95",
  storageBucket: "challenge-greydive-53f95.appspot.com",
  messagingSenderId: "721434738593",
  appId: "1:721434738593:web:42195b4ac4cdf2cb82d5e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



function App() {
  return (<>
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path='/respuestas' element={<Respuestas/>}/>
    <Route path='/' element={<MyForm/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
    
  );
}

export default App;

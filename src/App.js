import "./App.css"
// import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/AuthComponents/Login";
import Signup from "./components/AuthComponents/Signup";
import HomeScreen from "./components/homeComponents/HomeScreen";
import CollectionScreen from "./components/collectionComponents/collectionScreen";
import BookshelfScreen from "./components/bookshelfComponents/bookshelfScreen";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
        <Route path="homeScreen" element={<HomeScreen />}/>
        <Route index element={<HomeScreen />} />
        <Route path="collection" element={<CollectionScreen />}/>
        <Route path="bookshelf" element={<BookshelfScreen />}/>
      </Routes>
    </div>
  )
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AstrologersList from "./pages/AstrologersList";
import AstrologerForm from "./pages/AstrologerForm";
import AstrologerEditForm from "./pages/AstrologerEdit";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AstrologerForm />} />
              <Route path="/astrologers" element={<AstrologersList />} />
              <Route path="/astrologers/:id" element={<AstrologerEditForm />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </Provider>
    </>
  );
}

export default App;

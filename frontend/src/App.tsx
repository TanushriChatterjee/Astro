import { BrowserRouter, Routes, Route } from "react-router-dom";
import AstrologersList from "./pages/AstrologersList";
import AstrologerForm from "./pages/AstrologerForm";
import AstrologerEditForm from "./pages/AstrologerEdit";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Provider store={store}>
        <div
          className="App"
          style={{
            backgroundImage:
              "url('https://fanaru.com/astrology-signs-and-arts/image/151007-astrology-signs-and-arts-zodiac-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AstrologerForm />} />
              <Route path="/astrologers" element={<AstrologersList />} />
              <Route path="/astrologers/:id" element={<AstrologerEditForm />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </Provider>
    </>
  );
}

export default App;

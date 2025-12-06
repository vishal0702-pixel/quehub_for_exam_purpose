import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store"; // ✅ keep this if you exported with `export const store =`
import Home from "./components/home"; // ✅ folder name should be "components", not "components.js"

function App() {
  return (
    <>
      hello
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

// ✅ Mount only in main.jsx, not here
// Remove this if it exists here

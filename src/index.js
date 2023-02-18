import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import APP from "./Components/APP";
import store from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import swDev from "./swDev";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <APP />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
swDev();

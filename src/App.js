import React from "react";
import Application from "./Application";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";

let persistor = persistStore(store);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Application />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}
export const storeinstance = store;
export default App;

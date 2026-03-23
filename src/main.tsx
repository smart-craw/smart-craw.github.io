import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";
import { HashRouter } from "react-router";
render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("app")!,
);

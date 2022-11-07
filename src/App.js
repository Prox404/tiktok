import { Routes, Route, useLocation } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes, privateRoutes } from "~/routes";
import { DefaultLayout } from "./components/Layout";
import LoginModal from "~/components/LoginModal"
import VideoModal from "./components/VideoModal";

function App() {
  const location = useLocation();
  const modal = location.state && location.state.modal;
  const videos = location.state && location.state.videos;

  return (
    <div className="App">
      <Routes location={modal || videos || location}>

        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout
          } else if (route.layout === null) {
            Layout = Fragment
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout><route.component /></Layout>}
              exact={route.exact ? true : false}
            />
          );
        })}

        {privateRoutes.map((route, index) => {
          const Layout = route.layout || DefaultLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout><route.component /></Layout>}
            />
          );
        })}
      </Routes>
      {modal && (
        <Routes>
          <Route path="login" element={<LoginModal />} />
        </Routes>
      )}
      {videos && (
        <Routes>
          <Route path="/videos/:id" element={<VideoModal />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

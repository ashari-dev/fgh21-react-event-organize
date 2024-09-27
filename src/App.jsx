import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyBooking from "./page/MyBooking";
import MyWishlist from "./page/MyWishlist";
import CreateEvent from "./page/CreateEvent";
import ChangePassword from "./page/ChangePassword";
import EditProfile from "./page/EditProfile";
import EventPayment from "./page/Events/EventPayment";
import EventPage from "./page/Events/Event";
import Home from "./page/PageHome";
import ForgetPassword from "./page/Auth/ForgetPassword";
import Login from "./page/Auth/Login";
import Register from "./page/Auth/Register";
import EventBooking from "./page/Events/EventBooking";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Profile from "./page/Profile";
import Location from "./page/Location";

const persist = persistStore(store);
const routers = createBrowserRouter([
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/event/:id",
    element: <EventPage />,
  },
  {
    path: "/event/booking/:id",
    element: <EventBooking />,
  },
  {
    path: "/event/payment",
    element: <EventPayment />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/profile/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/my-booking",
    element: <MyBooking />,
  },
  {
    path: "/my-wishlist",
    element: <MyWishlist />,
  },
  {
    path: "/create-event",
    element: <CreateEvent />,
  },
  {
    path: "/location",
    element: <Location />,
  },
]);
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <RouterProvider router={routers} />
      </PersistGate>
    </Provider>
  );
}

export default App;

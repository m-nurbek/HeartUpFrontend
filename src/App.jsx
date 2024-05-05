import { Link, useNavigate } from "react-router-dom";
import Heart3d from "./components/Heart3d";
import HeartUpLogo from "/HeartUpLogo.svg";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <>
      <Navbar linkText="Sign In" className={'navbar--fixed'} navigateTo="/login" />
      <main className="main-container">
        <div className="main-container__text">
          <h1><img src={HeartUpLogo} alt="" />eart<span>Up</span></h1>
        </div>
      </main>
      {/*<Heart3d />*/}
    </>
  );
}

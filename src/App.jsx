import Heart3d from "./components/Heart3d";
import HeartUpLogo from "/HeartUpLogo.svg";


export default function App() {
  return (
    <>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Login</li>
          <li>SignUp</li>
        </ul>
      </nav>
      <main className="main-container">
        <div className="main-container__text">

          <h1><img src={HeartUpLogo} alt="" />eartUp</h1>
          <div className="slogan">
            <p className="p1">where care</p>
            <p className="p2">meets innovation</p>
          </div>
        </div>
      </main>
      <Heart3d />
    </>
  );
}

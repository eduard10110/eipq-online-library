import React, {useState} from "react";
import { Link } from "react-router-dom";
import SmoothScroll from "smooth-scroll";
import { NavHashLink } from "react-router-hash-link";
import "./style.scss";
// import UserNavbar from "components/UserNavbar";
export const scroll = new SmoothScroll('Link[to*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Start = () => {
  // const [loading, setLoading] =useState(false);

  return (
    <div className="container">
      <nav>
        <div className="navright">
          <NavHashLink smooth to="#header">
            ԵԻՊՔ ԳՐԱԴԱՐԱՆ
          </NavHashLink>
        </div>
        <div className="navleft">
          <NavHashLink smooth to="#about">
            ԻՆՉՊԵ՞Ս ՕԳՏՎԵԼ
          </NavHashLink>
          <NavHashLink to="#team">ՀԵՂԻՆԱԿՆԵՐ</NavHashLink>
          <Link to="/login">ՄՈՒՏՔ</Link>
        </div>
      </nav>
      <div>
        <div className="info">
          <div id="header" className="overlay">
            <h1>
              ԲԱՐԻ ԳԱԼՈՒՍՏ ԵԻՊՔ-Ի ԳՐԱԴԱՐԱՆ
              <span></span>
            </h1>
            <p>
              ԵԻՊՔ-ի օնլայն գրադարան, որտեղ կարող ես փնտրել,գտնել և ամրագրել քեզ
              անհրաժեշտ գրքերը։
            </p>
            <Link to="#about" className="btn">
              Կարդալ ավելին
            </Link>
          </div>
        </div>
        <div id="about" className="about">
          <div className="aboutright">
            <img src="img/libraryphoto.jpg" alt="Img" />
          </div>
          <div className="aboutleft">
            <h2>ԻՆՉՊԵ՞Ս ՕԳՏՎԵԼ</h2>
            <p>
              ԵԻՊՔ-ի օնլայն գրադարանից օգտվելու համար մուտք գործիր քո էջ,եթե դեռ
              չես գրանցվել գրանցվի՛ր և 10 օրվա ընթացքում մոտեցի՛ր քոլեջի
              գրադարանավարին՝ գրանցումդ հաստատելու համար և դարձիր մեր օնլայն
              գրադարանի մասնիկը։ Շտապի՛ր մեր գրքերը քեզ են սպասում։
            </p>
            <h3>Ինչու՞ ընտրել հենց մեր գրադարանը</h3>
            <ol>
              <li>Մենք քեզ մոտ ենք</li>
              <li>Կարող ես ամրագրել երկար ժամանակով</li>
              <li>Ընտրել տանը, վերցնել քոլեջից</li>
              <li>Կարող ես կարդալ հենց գրադարանում</li>
              <li>Մենք քեզ չենք շտապեցնում</li>
            </ol>
          </div>
        </div>
      </div>
      <footer id="team">
        <h2>ՕՆԼԱՅՆ ԳՐԱԴԱՐԱՆԻ ՀԵՂԻՆԱԿՆԵՐ</h2>
        <p>
          ԵԻՊՔ-ի օնլայն գրադարանը ներկայացվել է, որպես դիպլոմային պրոեկտ 811
          խմբի ուսանողներ Արմինե Դեմիրչյանի և Ռաֆիկ Ծերունյանի կողմից՝ պարոն
          Վարդանյանի ղեկավարությամբ։
        </p>
      </footer>
    </div>
  );
};

export default Start;

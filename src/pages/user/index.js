import Loading from "components/loading";
import UserSelect from "components/userSelect";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import routes from "routes/routes";

import "./style.scss";

const User = () => {
  const [loading, setLoading] = useState(false); 
  return (
    <div className="main">
      {loading && <Loading />}
      
      <div className="header-wrapper">
        <nav>
        <div className="navright">
          <NavHashLink smooth to="#header" >
            ԵԻՊՔ ԳՐԱԴԱՐԱՆ
          </NavHashLink>
        </div>
        <div className="navleft">
          <NavHashLink smooth to="#about">ԻՆՉՊԵ՞Ս ՕԳՏՎԵԼ</NavHashLink>
          <Link to={routes.bookList}>ԳՐՔԵՐԻ ՑԱՆԿ</Link>
          <Link to={routes.myBooks}>ԻՄ ԳՐՔԵՐԸ</Link>
          <UserSelect setLoading={setLoading}/>
        </div>
      </nav>
        
        <div className="info-wrapper">
          <div className="info">
            <div id="header" className="overlay">
              <h1>
                ԲԱՐԻ ԳԱԼՈՒՍՏ ԵԻՊՔ-Ի ԳՐԱԴԱՐԱՆ
                <span></span>
              </h1>
              <p>
                ԵԻՊՔ-ի օնլայն գրադարան, որտեղ կարող ես փնտրել,գտնել և ամրագրել
                քեզ անհրաժեշտ գրքերը։
              </p>
              <Link to="#about" className="btn">
                Կարդալ ավելին
              </Link>
            </div>
          </div>
          <div id="about" className="about">
            <div className="aboutright">
              <img alt="" src="img/libraryphoto.jpg" />
            </div>
            <div className="aboutleft">
              <h2>ԻՆՉՊԵ՞Ս ՕԳՏՎԵԼ</h2>
              <p>
                Շնորհավորում եմ դուք արդեն մեր օնլայն գրադարանի անդամն եք:<br/><b>ԳՐՔԵՐԻ ՑԱՆԿ</b> կարող եք  ծանոթանալ քոլեջում առկա գրքերին, որտեղ կարող ես ընտրել ձեր նախընտրած գիրքը և ամրագրել ցանկալի ժամանակահատվածի համար:<br/><b>ԻՄ ԳՐՔԵՐԸ</b> բաժնում կարող եք տեսնել ձեր ամրագրած և արդեն վերադարձրած գրքերի կարգավիճակը։<br/>Սեղմելով վերևում գրված օգտատիրոջ անվան վրա կարող եք դուրս գալ ձեր էջից կամ փոխել ձեր գաղտնաբառը։
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;


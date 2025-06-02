import React from "react";
import one from "../../assets/dna_page/one.png";
import two from "../../assets/dna_page/two.png";
import three from "../../assets/dna_page/three.png";
import four from "../../assets/dna_page/four.png";
import five from "../../assets/dna_page/five.png";
import six from "../../assets/dna_page/six.png";

const Commercial_Spaces = () => {
  return (
    <>
      <div className="commercail-spaces">
        <div className="container">
          <div className="section-title">
            <h2>commercial spaces</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              posuere est purus, pellentesque convallis nibh vehicula ut.
              Aliquam maximus nisl sit amet mi suscipit vestibulum a eget dolor.
              Duis in rutrum nulla, eget dictum orci. Pellentesque odio nisi,
              mollis ac turpis vitae, vestibulum sollicitudin dui. Nunc sit amet
              ligula eros. Ut quis risus dui. Maecenas in justo non lacus
              pellentesque sodales et quis eros. Praesent volutpat rutrum
              varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque posuere est purus, pellentesque convallis nibh vehicula
              ut. Aliquam maximus nisl sit amet mi suscipit vestibulum a eget
              dolor. Duis in rutrumnj.
            </p>
          </div>
        </div>
        <div className="section-blead">
          <div className="commercial-grid">
            <div className="commercial-grid-box">
              <img src={one} alt="" />
              <img src="" alt="" />
            </div>
            <div className="commercial-grid-box">
              <img src={two} alt="" />
              <img src="" alt="" />
            </div>
            <div className="commercial-grid-box">
              <img src={three} alt="" />
              <img src="" alt="" />
            </div>
            <div className="commercial-grid-box">
              <img src={four} alt="" />
              <img src="" alt="" />
            </div>
            <div className="commercial-grid-box">
              <img src={five} alt="" />
              <img src="" alt="" />
            </div>
            <div className="commercial-grid-box">
              <img src={six} alt="" />
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Commercial_Spaces;

import { NavLink } from 'react-router-dom'

const Media = () => {
  return (
        <section className="media">
          <div className="container">
            <div className="msubhead msubhead2">
              <span>See what the </span>
              <h2 className="heading skyblue">Media</h2>
            </div>
            <div className="msubhead">
              <span className="mline"></span>
              <span>has to say about us</span>
            </div>
  
            <div className="mediaslider">
              <div className="mediaslide">
                <img alt="Team" src="/images/media1.jpg" />
                <p>
                  Discussion between Bhagyashree and Mr. Kunal Bhalla on Woman
                  Leading Growth!
                </p>
              </div>
              <div className="mediaslide">
                <img alt="Team" src="/images/media2.jpg" />
                <p>
                  Discussion between Bhagyashree and Mr. Kunal Bhalla on Woman
                  Leading Growth!
                </p>
              </div>
              <div className="mediaslide">
                <img alt="Team" src="/images/media3.jpg" />
                <p>
                  Discussion between Bhagyashree and Mr. Kunal Bhalla on Woman
                  Leading Growth!
                </p>
              </div>
            </div>
            <NavLink className={"read"} to="/">
              Read More
            </NavLink>
          </div>
        </section>
  )
}

export default Media
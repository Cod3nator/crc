import React, { useEffect, useState } from 'react'

const What_We_Do = () => {
  const [animations, setAnimations] = useState([])

  const services = [
    {
      id: 1,
      image: "/images/wwd1.jpg",
      title: "Commercial",
      link: "/"
    },
    {
      id: 2,
      image: "/images/wwd2.jpg",
      title: "Residential", 
      link: "/"
    },
    {
      id: 3,
      image: "/images/wwd3.jpg",
      title: "Retails",
      link: "/"
    },
    {
      id: 4,
      image: "/images/wwd4.jpg",
      title: "Hospitality",
      link: "/"
    }
  ]

  // Generate random animation properties for each item
  useEffect(() => {
    const generateAnimations = () => {
      return services.map(() => ({
        duration: 3 + Math.random() * 4, // 3-7 seconds
        delay: Math.random() * 2, // 0-2 seconds delay
        translateY: 10 + Math.random() * 20, // 10-30px float distance
        rotateRange: 2 + Math.random() * 4 // 2-6 degrees rotation
      }))
    }
    
    setAnimations(generateAnimations())
  }, [])

  const FloatingItem = ({ service, animation, index }) => {
    const animationStyle = animation ? {
      animation: `float-${index} ${animation.duration}s ease-in-out ${animation.delay}s infinite alternate`,
    } : {}

    return (
      <div 
        className="wwditem"
        style={animationStyle}
      >
        <div className="wwditemcontainer">
          <img 
            alt={service.title} 
            src={service.image}
          />
          <div className="overlay3">
            <a href={service.link}>
              Know More
            </a>
          </div>
        </div>
        <a href={service.link} className="service-title">
          {service.title}
        </a>
      </div>
    )
  }

  return (
    <>
<style>
  {`
    .wwditem {
      position: relative;
      cursor: pointer;
      transform-origin: center;
      transition: all 0.3s ease;
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
    }

    ${animations.map((anim, index) => `
      @keyframes float-${index} {
        0% {
          transform: translateY(0px) rotate(0deg);
        }
        100% {
          transform: translateY(-${anim.translateY}px) rotate(${anim.rotate || 0}deg);
        }
      }

      .wwditem:nth-child(${index + 1}) {
        animation-name: float-${index};
      }
    `).join('\n')}
  `}
</style>

      
      <section className="wwd">
        <div className="container">
          <h2 className="heading green">What We Do</h2>

          <div className="wwdcontainer">
            {services.map((service, index) => (
              <FloatingItem
                key={service.id}
                service={service}
                animation={animations[index]}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default What_We_Do
import './App.css';
import SlideCard from './component/slide-card';
import Type from './component/type';
import Footer from './component/contact'
import Pics from './component/2pic'

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';



function App() {
  
  const images = [
    "gold-1.jfif",
    "gold-2.jfif",
    "gold-3.jfif",
    "gold-4.jfif",
    "gold-5.jpg",
    "gold-6.jpg",
  ];

  const davImg = [
    "dav-1.jpg",
    "dav-2.jfif",
    "dav-4.jfif",
    "dav-3.jfif",
    "dav-5.jfif",
    "dav-6.jfif"
  ]

  const tletImg = [
    "tlet-1.jfif",
    "tlet-2.jfif",
    "tlet-3.jfif",
    "tlet-4.jfif",
    "tlet-5.jfif",
    "tlet-6.jfif"
  ]

  const footerImg = [
    "scan me.png",
    "app stor.jfif",
    "play stor.jfif"
  ]

  const starImg = [
    'star.png'
  ]

  const picImg = [
    'Amhara.png',
    'አማራ_Amhara.png',
    'Ethiopia.png'
  ] 

  // ========================

  const imgClouse = [
    [
        '/img/img-a1.jfif',
        '/img/img-a2.jfif',
        '/img/img-a3.jfif',
        '/img/img-a4.jfif',
        '/img/img-a5.jfif',
    ],
    [
        '/img/img-d1.jfif',
        '/img/img-d2.jfif',
        '/img/img-d3.jfif',
    ],
    [
        '/img/img-e1.jfif',
        '/img/img-e2.jfif',
        '/img/img-e3.jfif',
        '/img/img-e4.jfif',
    ],
    [
        '/img/img-g1.jfif',
        '/img/img-g2.jfif',
        '/img/img-g3.jfif',
        '/img/img-g4.jfif',
    ],
    [
        '/img/img-h1.jfif',
        '/img/img-h2.jfif',
        '/img/img-h3.jfif',
        '/img/img-h4.jfif',
    ],
];


  return (
    <>

      <div className="home">
        {/* Header Section */}
        <header>
          <div className="icon-home">
            <h1>እንቁ ጥበብ</h1>
          </div>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Amhara</a></li>
              <li><a href="#">Contact</a></li>    
            </ul>
          </nav>
          <button className='nav-button'>Shop Know<img className='online-shop-img' src='online-shopping.png'/></button>
        </header>
        {/* Main Content Section */}
        <div className="body">
          <section className="hero">
            <div className="hero-content">
              <h1>Hi, welcome to <span>እንቁ ጥበብ</span></h1>
              <p>
                For farming, celebration, Christianity, and various programs,
                <br/>Girma Moges wears the Habesha Kemis.<br/><br/>ለሰርግ፣ለክርስትና፣ለድግስ
                ዝንጥ የሚሉበት ጥራቱን የጠበቀ የሀበሻ ልብሶች<br/>በቀጭን ጥለት በጣም ቆንጆ የሆነ ለአይን የሚስብ ውብ የሀበሻ ቀሚስ  <br/>ለተለያዩ ፕሮግራሞች የሚሆን
              </p><br/>
              <a href="#projects" className="btn">View My Work</a>
            </div>
          </section>

          <div className="home-img-div">
            <img className="home-img" src="/home_img.png" alt="home" />
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="slideCard slider">
        <div className="slider-container">
          {images.map((image, index) => (
            <SlideCard key={index} image={image}  star={starImg[0]}/>
          ))}
          {/* Duplicate the images for seamless looping */}
          {images.map((image, index) => (
            <SlideCard key={`clone-${index}`} star={starImg[0]} image={image} />
          ))}
        </div>
      </div>
      
      

      <div className='type-contener'>
        <Type tlet1={tletImg[0]} tlet2={tletImg[1]} tlet3={tletImg[2]} tlet4={tletImg[3] }
              davImg1={davImg[0]}  davImg2={davImg[1]}  davImg3={davImg[2]} 
              davImg4={davImg[3]}  davImg5={davImg[4]}  davImg6={davImg[5]} />
      </div>


      <Pics picsImg0={picImg[0]} picsImg1={picImg[1]} picsImg2={picImg[2]} />
      
      <Footer scanImg={footerImg[0]} appImg={footerImg[1]} playImg={footerImg[2]}  />
    </>
  );
}

export default App;
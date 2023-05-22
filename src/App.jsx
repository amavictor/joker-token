import { useEffect, useRef, useState } from 'react';
import './App.scss';
import Joker from './assets/joker.jpg';
import JokerToken from "./assets/joker-token.png";
import GreenLight2 from "./assets/green-light-2.svg";
import GreenLight3 from "./assets/green-light-3.svg";
import Joker1 from "./assets/joker1.png"
import Joker2 from "./assets/joker2.png"
import Joker3 from "./assets/joker3.png"
import Joker4 from "./assets/joker4.png"
import Twitter from "./assets/twitter.png"
import Telegram from "./assets/telegram.png"
import { ReactLenis } from "@studio-freight/react-lenis";
import Lenis from "@studio-freight/lenis";
import 'aos/dist/aos.css'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { Doughnut } from 'react-chartjs-2';

import AOS from 'aos';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

function App() {

  AOS.init()

  const [isHovered, setIsHovered] = useState(false);
  const home = useRef(null)
  const aboutSection = useRef(null)
  const howToBuy = useRef(null)
  const tokenNomics = useRef(null)
  const roadMap = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (target) => {
    target.current?.scrollIntoView({ behavior: 'smooth' });

    console.log("scroll", target)
    if (isMenuOpen) {
      toggleMenu()
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //roadmap scroll effect



  useEffect(() => {
    const qs = (selector, all = false) =>
      all ? document.querySelectorAll(selector) : document.querySelector(selector);

    const sections = qs('.section', true);
    const timeline = qs('.timeline');
    const line = qs('.line');
    line.style.bottom = `calc(100% - 20px)`;
    let prevScrollY = window.scrollY;
    let up, down;
    let full = false;
    let set = 0;
    const targetY = window.innerHeight * 0.8;

    const scrollHandler = () => {
      const { scrollY } = window;
      up = scrollY < prevScrollY;
      down = !up;
      const roadmapRect = qs('#roadmap').getBoundingClientRect();
      const timelineRect = timeline.getBoundingClientRect();
      const lineRect = line.getBoundingClientRect();
      const dist = targetY - timelineRect.top;
      const roadmapBottom = roadmapRect.top + roadmapRect.height;

      if (down && !full) {
        set = Math.max(set, dist);
        line.style.bottom = `calc(100% - ${set}px)`;
      }

      if (dist > timeline.offsetHeight + 50 && !full) {
        full = true;
        line.style.bottom = '-50px';
      }

      if (lineRect.bottom >= roadmapBottom) {
        // line.style.display = 'none';
        window.removeEventListener('scroll', scrollHandler);
      }

      sections.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top + item.offsetHeight / 5 < targetY) {
          item.classList.add('show-me');
        }
      });

      prevScrollY = window.scrollY;
    };

    scrollHandler();
    line.style.display = 'block';
    window.addEventListener('scroll', scrollHandler);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    const pos = document.documentElement;

    const handleMouseMove = (e) => {
      pos.style.setProperty('--x', e.clientX + 'px');
      pos.style.setProperty('--y', e.clientY + 'px');
    };

    pos.addEventListener('mousemove', handleMouseMove);

    return () => {
      pos.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const data = {
    labels: ["Liquidity Pool", "Team", "Rewards", "Public sale"],
    datasets: [{
      label: "Poll",
      data: [80, 10, 5, 5],
      backgroundColor: ["#1c2921", "rgba(255,0,0,0.3)", "rgba(40, 67, 135, 1)", "gold"],
      hoverBackgroundColor: ["green", "rgba(255,0,0,1)", "blue", "yellow"],
      borderColor: "black"
    }]
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          fontSize: "20px"
        }
      }
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })


    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])














  return (
    <ReactLenis root>
      <div className="main-container">
        <div className="header" ref={home}>
          <img src={Joker} alt="Joker" />
          <div className="light" />
          <nav>

            <ul className={`${isMenuOpen ? 'show' : ''}`}>
              <div className={`close-button ${isMenuOpen && "show-cancel"}`} onClick={toggleMenu}>
                &#10005;
              </div>
              <li onClick={() =>
                handleScroll(home)
              }>Home</li>
              <li onClick={() =>
                handleScroll(aboutSection)
              }>About</li>
              <li onClick={() =>
                handleScroll(howToBuy)
              }>How to buy</li>
              <li onClick={() =>
                handleScroll(tokenNomics)
              }>Tokenomics</li>
              <li onClick={() =>
                handleScroll(roadMap)
              }>Roadmap</li>
            </ul>

            <div className='hamburger-container' onClick={toggleMenu}>
              <div className='hamburger' />
              <div className='hamburger' />
              <div className='hamburger' />
            </div>


          </nav>

          <div className='title'>
            <div className='title-text'>
              $Joker
            </div>
            <h2>The madness is like gravity, all it takes is a little push.</h2>
            <img src={JokerToken} />
            <img src={JokerToken} />
            <img src={JokerToken} />
            <img src={JokerToken} />
            <img src={JokerToken} />
          </div>
        </div>

        <main>
          <img className='green-light1' src={GreenLight3} />
          <img className='green-light2' src={GreenLight2} />
          <img className='green-light3' src={GreenLight3} />
          <img className='green-light4' src={GreenLight2} />

          <div id='about-section' ref={aboutSection}>
            <h3>About $Joker</h3>
            <div className='about-details'>
              <p>$Joker is an ERC20 token designed to capture the essence of the infamous
                comic book and movie character, the Joker. With a twist of humor and mischief,
                this meme coin aims to bring you and entertainment to the cryptocurrency world.
              </p>
              <img src={JokerToken} />
            </div>

            <div id="how-to-buy" ref={howToBuy}>
              <h3>How to buy $Joker</h3>
              <div className='how-to-buy-details'>
                {/* <img src={MockUp} /> */}

                <div className={`card ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                  <div className="card-details">
                    <h4>Create a wallet</h4>
                    <p>
                      Download MetaMask or your wallet of choice from the app store or Google Play Store for free. Desktop users can download the Google Chrome extension by going to metamask.io.
                    </p>
                  </div>
                  <img src={Joker1} className="card-image" alt="Card" />
                </div>
                <div className='card'>
                  <div className='card-details'>
                    <h4>Get some Eth</h4>
                    <p>Have ETH in your wallet to switch to <span>$JOKER.</span>If you don’t have any ETH, you can buy directly on metamask, transfer from another wallet, or buy on another exchange and send it to your wallet.</p>
                  </div>
                  <img src={Joker2} className="card-image" />
                </div>

                <div className='card'>
                  <div className='card-details'>
                    <h4>Go to Uniswap</h4>
                    <p>Connect to Uniswap. Go to app.uniswap.org in google chrome or on the browser inside your Metamask app. Connect your wallet. Paste the <span>$JOKER</span> token address into Uniswap, select Joker, and confirm. When Metamask prompts you for a wallet signature, sign.</p>
                  </div>
                  <img src={Joker3} className="card-image" />
                </div>

                <div className='card'>
                  <div className='card-details'>
                    <h4>Switch Eth for $Joker</h4>
                    <p>Switch ETH for <span>$JOKER</span>. with our low taxes, you should have no problems, but you may need to use slippage during times of market volatility.</p>
                  </div>
                  <img src={Joker4} className="card-image" />
                </div>

              </div>

            </div>

            <div id='tokenomics' ref={tokenNomics}>
              <h3>Tokenomics</h3>
              <div className='tokenomics-details'>
                <div>
                  <h5>Token supply: 10,000,000</h5>
                  <div className='token-details'>
                    <p>
                      2% Taxes, No Bullshit. It’s that simple.
                      80% of the tokens were sent to the liquidity pool, LP tokens were burnt, and contract is renounced.
                      The remaining 20% of the supply is being held in a multi-sig wallet only to be used
                      as tokens for future centralized exchange listings, bridges, and
                      liquidity pools. This wallet is easily trackable with the ENS name
                      “jokerwallet.eth”</p>
                  </div>
                </div>
                <div className='chart'>
                  <Doughnut
                    data={data}
                    options={options}
                  />
                </div>
              </div>

            </div>


            <div id="roadmap" ref={roadMap}>
              <h3>Roadmap</h3>
              <div className='description'>
                <p>All jokes aside, here is a rough sketch of $Joker path ahead.
                  We dont wan’t to give everything away on day 1 😁
                </p>

                <div className='roadmap-card-container'>
                  <div className='roadmap-card'>
                    <h4>Phase 1</h4>
                    <p>Joker</p>
                  </div>
                  <hr />
                  <div className='roadmap-card'>
                    <h4>Phase 2</h4>
                    <p>Vibe & HODL</p>
                  </div>
                  <hr />
                  <div className='roadmap-card'>
                    <h4>Phase 3</h4>
                    <p>Joker Takeover</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="timeline">
                  <div className="line" />
                  <div className="section">
                    {/* <div className="bead" /> */}
                    <div
                      className="content"
                      data-aos="fade-right"
                      data-aos-delay="200"
                    >
                      <h5>Phase 1</h5>
                      <ul>
                        <li>Launch</li>
                        <li>CoinGecko/Coinmarketcap Listings</li>
                        <li>1,000+ Holders</li>
                        <li>Get $JOKER Trending on Twitter with our memetic power</li>
                      </ul>
                    </div>
                  </div>

                  <div className="section">
                    {/* <div className="bead" /> */}
                    <div
                      className="content"
                      data-aos="fade-left"
                      data-aos-delay="200"
                    >
                      <h5>Phase 2</h5>
                      <ul>
                        <li>Community Partnerships Pepe Times digital newsletter</li>
                        <li>Formation of token gated discord group, Pepe Palace, for holders, more details tba</li>
                        <li>CEX Listings 10,000+holders</li>
                        
                      </ul>
                    </div>
                  </div>

                  <div className="section">
                    {/* <div className="bead" /> */}
                    <div
                      className="content"
                      data-aos="fade-right"
                      data-aos-delay="200"
                    >
                      <h5>Phase 3</h5>
                      <ul>
                        <li>Joker merch</li>
                        <li>Joker Academy</li>
                        <li>Joker Tools</li>
                        <li>T1 Exchange Listings 100,000+ holders</li>
                        <li>Joker takeover</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <h4>Contact us</h4>
          <img src={JokerToken} />
          <div>
            <a href='https://twitter.com/mrjoker_erc20?t=O5GAFh4SI5kULtkcQBkEaQ&s=09' target={"_blank"} rel="noreferrer"><img src={Twitter} className="social" /></a>
            <a href="https://t.me/mrjokertoken" target={"_blank"} rel="noreferrer"><img src={Telegram} className="social" /></a>
          </div>
        </footer>
      </div>
    </ReactLenis>

  );
}

export default App;



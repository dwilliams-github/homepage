import React from 'react';
import { Link } from "react-router-dom";
import Banner from './Banner';
import Side from './Side';
import fred from './images/fred.jpg';
import flyerShip from './images/ship.png';
import './css/projects.css';

class Projects extends React.Component {
    render() {
        const sides = [
            {
                title: 'Contents',
                items: [
                    <a href="#apps">Apps</a>,
                    <a href="#robots">Robotics</a>,
                    <a href="#classMac">Class MacOS apps</a>,
                    <a href="#pCT">Computed Tomograph</a>,
                    <a href="#hep">High-Energy Physics</a>,
                    <a href="#fiction">Fiction</a>
                ]
            },
            {
                special: "site"
            },
            {
                title: "Links",
                items: [
                    <a href="https://github.com/dwilliams-github" target="_blank">
                        Public code repository (GitHub)
                    </a>,
                    <a href="http://scipp.ucsc.edu/" target="_blank">
                        Santa Cruz Institute of Particle Physics
                    </a>
                ]
            },
            {
                special: "about"
            }
        ]

        return (
            <div className="projects content">
                <Banner />
                <Side contents={sides}/>
                <div className="text">
                    <h3><a name="apps">Apps</a></h3>

                    <div className="image">
                        <img src={flyerShip} alt="flyer" width="80px"/>
                    </div>

                    <p>
                        I wrote a simple arcade-style game called "Flyer" many years ago, and even wrote a <a href="https://github.com/dwilliams-github/flyer" target="_blank">port</a> to the classic MacOS. Recently I decided it would be fun to recreate it for modern Macs. The result was convincing enough that I decided to offer it on the <a href="https://apps.apple.com/us/app/flyer/id1494646505" target="_blank">Mac App Store</a>.
                    </p>

                    <p>
                        This is the third version of Flyer, and is compatible with macOS 10.14 or later (64 bit processor). If you want some simple fun (and own a Mac), I encourage you to give it a try (it's free). If you are curious about how it was written, you can find the source on my <a href="https://github.com/dwilliams-github/flyer-macos" target="_blank">Public GitHub</a>. For more information, see the simpe <a href="https://flyer.slashdave.com" target="_blank">web site</a> I created to support the game.
                    </p>

                    <p>
                        This project was my introduction to the <a href="https://swift.org" target="_blank">Swift</a> programming language and also my first serious project built using <a href="https://developer.apple.com/xcode/" target="_blank">Xcode</a>. Performance is no longer an issue on modern computer hardware, so for this version I focused instead on adding some new features, like <a href="https://developer.apple.com/documentation/avfoundation/avaudio3dmixing" target="_blank">3D sound</a>.
                    </p>

                    <h3><a name="robots">Robotics</a></h3>

                    <div className="image">
                        <img src={fred} alt="fred" width="180px"/>
                    </div>

                    <p>
                        I've always been interested in robots, and even as a child I built little motorized contraptions. In the summer of 2001 I decided (in my spare time) that I would try to build something a little more serious. The result was the robot (named "Fred") pictured to the left.
                    </p>

                    <p>
                        This is before 3D printing was available, so I designed and constructed Fred's frame from bent aluminum and screws and used a track chassis I cut out of a motorized plastic toy. Fred is powered by a <a href="http://handyboard.com/hb/" target="_blank">HandyBoard</a>, a computer platform build around a Motorola MC68HC11 embedded processor that is primitive by today's standards. Fred features a sonic range finder, a directional photodetector, bump switches for collision detection, and dual optical decoder disks to measure wheel rotation.
                    </p>

                    <p>
                        I wrote Fred's operating system <a href="https://github.com/dwilliams-github/robots" target="_blank">from scratch</a> in a combination of C and assembly.
                    </p>

                    <div className="image-right">
                        <iframe src="https://player.vimeo.com/video/379925448" width="380" height="200" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                    </div>

                    <p>
                        One of my annual holiday rituals is to log into our Christmas tree and perform a software update. Which sounds strange, except our Christmas tree is controlled by a <a href="https://www.raspberrypi.org/" target="_blank">Raspberry Pi</a>.
                    </p>

                    <p>
                        In it's latest configuration, the tree has 100 LED RGB lights, each individually programmable. The lights are quite bright and certain effects can be pretty garish. So as to not to be too distracting, I have programmed the default light sequence to gently rotate colors. Since the Raspberry Pi has a synchronized clock, I have also programmed it to turn off late at night and back on in the morning.
                    </p>

                    <p>
                        You can find details of this project on <a href="https://github.com/dwilliams-github/xmastree" target="_blank">GitHub</a>.
                    </p>

                    <div className="clear"/>

                    <h3><a name="classicMac">Classic MacOS applications</a></h3>

                    <p>
                        Between 1988 and 1998 I wrote a bunch of applications for fun for the <a href="https://en.wikipedia.org/wiki/Classic_Mac_OS" target="_blank">Classic MacOS</a> operating system. This operating system has long become obsolete, and the "event driven" architecture for its applications is quite different than what we are used to today. Many of the projects were left in various states of completion. Below are listed, in chronological order, some of the more functional examples:
                    </p>

                    <ul>
                        <li><a href="https://github.com/dwilliams-github/flyer" target="_blank">Flyer</a>: a black+white real-time video game in the spirit of <a href="https://en.wikipedia.org/wiki/Asteroids_(video_game)" target="_blank">Asteroids</a> driven by a built-in <a href="https://en.wikipedia.org/wiki/Sprite_(computer_graphics)" target="_blank">sprite library</a>.</li>

                        <li><a href="https://github.com/dwilliams-github/Mandel" target="_blank">Mandel</a>: A simple program for graphically exploring the <a href="https://en.wikipedia.org/wiki/Mandelbrot_set" target="_blank">Mandelbrot set</a>.</li>

                        <li><a href="https://github.com/dwilliams-github/Henon" target="_blank">Henon</a>: A simple program for graphically exploring the <a href="https://en.wikipedia.org/wiki/H%C3%A9non_map" target="_blank">Hénon Map</a>.</li>

                        <li><a href="https://github.com/dwilliams-github/cridders" target="_blank">Cridders</a>: An artifical life evolution simulation, with behavior controlled through mutable genes.</li>

                        <li><a href="https://github.com/dwilliams-github/duit" target="_blank">Duit</a>: An editor for <a href="https://en.wikipedia.org/wiki/Doom_WAD" target="_blank">Doom WAD</a> game files.</li>

                        
                    </ul>

                    <h3><a name="pCT">Computed Tomography</a></h3>

                    <p>
                        While at Santa Cruz, in cooperation with the <a href="http://scipp.ucsc.edu/" target="_blank">Santa Cruz Institute of Particle Physics</a> and the <a href="http://www.protons.com/index.html" target="_blank">Loma Linda University Medical Center</a>, I studied the possible application of protons in computed tomography. Take a peek at the <a  href="http://scipp.ucsc.edu/pCT/" target="_blank">pCT web site</a> for the latest on this project.
                    </p>

                    <p>
                        One of the biggest issues with proton computed tomograph (pCT) is how to deal with <a href="http://pdg.lbl.gov/2005/reviews/passagerpp.pdf" target="_blank">multiple-Coulomb scattering</a>. I wrote a paper to address this:
                    </p>

                    <div className="reference">
                        <ol>
                            <li>
                                <a href="public/papers/banana.pdf" target="_blank">The Most Likely Path of an Energetic Charged Particle Through a Uniform Medium, David C. Williams, Phys.Med.Biol. 49 No 13: (2004) 2899.</a>
                            </li>
                        </ol>
                    </div>

                    <h3><a name="hep">High-Energy Physics</a></h3>

                    <p>
                        The authorship of publications is a <Link to="projects/hepauthors" >complicated subject</Link> in high-energy physics (I am technically on the author list of some 400 or so peer-reviewed journal articles). The result is that you will need to trust me when I say that I actually wrote the following papers. The style follows the convention of the collaboration under which they were prepared, which is sometimes very stilted. But you can still get an idea of my technical writing skills.
                    </p>

                    <div className="reference">
                        <ol>
                            <li>
                                <a href="http://www.arxiv.org/abs/hep-ex/0604030" target="_blank">A Study of the D<sub>sJ</sub>(2317)<sup>+</sup> and D<sub>sJ</sub>(2460)<sup>+</sup> Mesons in Inclusive ccbar Production near sqrt(s) = 10.6&nbsp;GeV, the BaBar Collaboration, submitted to Phys.Rev. D.</a>
                            </li>
                            <li>
                                <a href="http://www.arxiv.org/abs/hep-ex/0603052" target="_blank">Observation of a Charmed Baryon Decaying to D<sup>0</sup> p at a Mass Near 2.94 GeV/c<sup>2</sup>, the BaBar Collaboration, submitted to Phys.Rev.Lett.</a>
                            </li>
                            <li>
                                <a href="http://www.arxiv.org/abs/hep-ex/0306003" target="_blank">Limits on D<sup>0</sup> Mixing and CP Violation from the Ratio of Lifetimes from K<sup>&minus;</sup>&pi;<sup>+</sup>, K<sup>&minus;</sup>K<sup>+</sup>, and &pi;<sup>&minus;</sup>&pi;<sup>+</sup> Decays, the BaBar Collaboration, Phys.Rev.Lett <b>91</b> (2003) 121801.</a>
                            </li>
                            <li>
                                <a href="http://arXiv.org/abs/hep-ex/9905032" target="_blank">Measurement of the High-Q<sup>2</sup> Neutral-Current e<sup>+</sup>p Deep Inelastic Scattering Cross-Sections at HERA, the ZEUS Collaboration, Eur.Phys.J <b>C11</b> (1999) 427</a>
                            </li>
                            <li>
                                <a href="http://arXiv.org/abs/hep-ex/9905039" target="_blank">Search for Contact Interactions in Deep Inelastic e<sup>+</sup>p &rarr; e<sup>+</sup> X Scattering at HERA, the ZEUS Collaboration, Eur.Phys.J <b>C14</b> (2000) 239.</a>
                            </li>
                        </ol>
                    </div>

                    <p>
                        By the way, if you are curious, they are all typeset using <a href="http://www.latex-project.org" target="_blank">LaTeX</a>. I also produced all of the figures.
                    </p>

                    <p>
                        Here are some papers in which I had a large hand in writing, but whose scientific results were obtained in collaboration with others.
                    </p>

                    <div className="reference">
                        <ol>
                            <li>
                                <a href="http://www.arxiv.org/abs/hep-ex/0310050" target="_blank">Observation of a Narrow Meson Decaying to D<sub>s</sub><sup>+</sup>&pi;<sup>0</sup>&gamma; at a Mass of 2.458 GeV/c<sup>2</sup>, the BaBar Collaboration, Phys.Rev. <b>D69</b> (2004) 031101.</a>
                            </li>
                            <li>
                                <a href="http://www.arxiv.org/abs/hep-ex/0304021" target="_blank">Observation of a Narrow Meson Decaying to D<sub>s</sub><sup>+</sup>&pi;<sup>0</sup> at a Mass of 2.32 GeV/c<sup>2</sup>, the BaBar Collaboration, Phys.Rev.Lett. (2003) 242001.</a>
                            </li>
                            <li>
                                <a href="http://arXiv.org/abs/hep-ex/0107052" target="_blank">Properties of Hadronic Final States in Diffractive Deep Inelastic ep Scattering at HERA, the ZEUS Collaboration, Phys.Rev. <b>D65</b> (2002) 052001.</a>
                            </li>
                        </ol>
                    </div>

                    <h3><a name="fiction">Fiction</a></h3>

                    <p>
                        I have several (maybe) marketable stories in various stages of completion, but since I will try to get them published, I won't post them here. Instead, here are two stories I wrote for writing workshops I attended.
                    </p>

                    <ul>
                        <li>
                            <a href="public/fiction/story.workshop1.pdf" target="_blank">A Large, Bearded Man</a>
                        </li>
                        <li>
                            <a href="public/fiction/story.workshop2.pdf" target="_blank">To the 2nd Street Theater</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
        
export default Projects;
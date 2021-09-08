import React from 'react';
import { Link } from "react-router-dom";
import Banner from './Banner';
import Side from './Side';
import fred from './images/fred.jpg';
import flyerShip from './images/ship.png';
import arrowBoard from './images/arrowboard.png'
import './css/projects.css';

function Projects() {
    const sides = [
        {
            title: 'Contents',
            items: [
                <a href="#chem">Drug Discovery</a>,
                <a href="#apps">Apps</a>,
                <a href="#web">Web</a>,
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
                <a href="https://covid19.slashdave.com/" target="_blank">
                    A collection of plots on COVID-19
                </a>,
                <a href="https://flyer.slashdave.com/" target="_blank">
                    Flyer
                </a>,
                <a href="https://orcid.org/0000-0002-4123-9339" target="_blank">
                    Research record (ORCID)
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
            <div className="text" >
                <h3><a name="chem">Drug Discovery</a></h3>

                <p>
                    My profession these last few years has been the study and application
                    of computational methods in drug discovery.
                    I prefer to keep my professional and public profiles separate, so I won't dwell on
                    any details here (you can find
                    them <Link to="/resume">elsewhere</Link> on this web site).
                    I'll just point out a few publications below. 
                </p>

                <div className="reference">
                    <ul>
                        <li>
                            <a href="https://chemrxiv.org/engage/chemrxiv/article-details/60ee20cf551cb0b4a8af665d" target="_blank">
                                Robust ligand-protein docking using an advanced genetic algorithm.
                            </a>,
                            DC. Williams, et al., submitted to the Journal of Computer-Aided Molecular Design.
                        </li>
                        <li>
                            <a href="https://linkinghub.elsevier.com/retrieve/pii/S0049384820301365" target="_blank">
                                VE-1902—A direct thrombin inhibitor with reversible covalent mechanism of 
                                action shows efficacy with reduced bleeding in rodent models of thrombosis
                            </a>,
                            M. Sivaraja, et al., Thrombosis Research 190 (2020): 112-121.
                        </li>
                        <li>
                            <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0201377" target="_blank">
                                Reversible covalent direct thrombin inhibitors
                            </a>,
                            M. Sivaraja, et al., PloS one 13.8 (2018): e0201377.
                        </li>
                    </ul>
                </div>

                <p>
                    You can also find my patents{' '}
                    <a href="https://patents.google.com/?inventor=%22WILLIAMS+DAVID%22&assignee=Verseon&country=US&status=GRANT&dups=language0" target="_blank">
                        here
                    </a>.
                </p>

                <h3><a name="apps">Apps</a></h3>

                <div className="image">
                    <img src={flyerShip} alt="flyer" width="80px"/>
                </div>

                <p>
                    I wrote a simple arcade-style game called "Flyer" many years ago, 
                    and even wrote a <a href="https://github.com/dwilliams-github/flyer" target="_blank">port</a>{' '} 
                    to the classic MacOS. Recently I decided it would be fun to recreate it for modern Macs. 
                    The result was convincing enough that I decided to 
                    offer it on the{' '}
                    <a href="https://apps.apple.com/us/app/flyer/id1494646505" target="_blank">Mac App Store</a>.
                </p>

                <p>
                    This is the third version of Flyer, and is compatible with macOS 10.14 or 
                    later (64 bit processor). If you want some simple fun (and own a Mac), 
                    I encourage you to give it a try (it's free). If you are curious about 
                    how it was written, you can find the source on my{' '}
                    <a href="https://github.com/dwilliams-github/flyer-macos" target="_blank">Public GitHub</a>. 
                    For more information, see the simple{' '}
                    <a href="https://flyer.slashdave.com" target="_blank">web site</a> I created to support the game.
                </p>

                <p>
                    This project was my introduction to the <a href="https://swift.org" target="_blank">Swift</a>{' '}
                    programming language and also my first serious project built 
                    using <a href="https://developer.apple.com/xcode/" target="_blank">Xcode</a>. 
                    Performance is no longer an issue on modern computer hardware, so for this 
                    version I focused instead on adding some new features, like{' '}
                    <a href="https://developer.apple.com/documentation/avfoundation/avaudio3dmixing" target="_blank">3D sound</a>.
                </p>

                <div className="image">
                    <img src={arrowBoard} alt="Arrow Board" width="120px" />
                </div>

                <p>
                    I've never written an application for a phone before, so I thought it would be 
                    fun to build something simple. Arrow is a iOS app that simulates a traffic{' '}
                    <a href="https://mutcd.fhwa.dot.gov/htm/2003r1r2/part6/fig6f-06_longdesc.htm" target="_blank">arrow board</a>. 
                    It is built using <a href="https://developer.apple.com/xcode/swiftui/" target="_blank">SwiftUI</a>, 
                    which is a great modern framework provided by Apple. The idea about the app came from my wife, 
                    who joked many years ago during a road trip about getting a construction road sign as a gift. 
                    Now she has one on her phone!
                </p>

                <p>
                    The app is fully functional and self contained. You won't find it on the Apple App Store, 
                    but you can check out the source on my{' '}
                    <a href="https://github.com/dwilliams-github/Arrow" target="_blank">Public GitHub</a>.
                </p>

                <h3><a name="web">Web</a></h3>

                <p>
                    The web site you are currently reading is my own design and implementation. 
                    In its current incarnation, the frontend is implemented in <a href="https://reactjs.org/" target="_blank">React</a>, 
                    the backend runs on <a href="https://nodejs.org/en/" target="_blank">Node.js</a>, and data is stored in{' '}
                    <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>. You can find all of the details on{' '}
                    <a href="https://github.com/dwilliams-github/homepage" target="_blank">github</a>. 
                    It is currently deployed on <a href="https://aws.amazon.com/" target="_blank">AWS</a>.
                </p>

                <p>
                    When the COVID-19 pandemic reached the United States, I could not resist studying its 
                    spread by analyzing data from several publicly available sources. My analyses started 
                    as a set of ad-hoc scripts which I pulled together organically using some of my favorite 
                    data science tools, including <a href="https://pandas.pydata.org/" target="_blank">pandas</a>,{' '}
                    <a href="https://matplotlib.org/" target="_blank">matplotlib</a>, and <a href="https://jupyter.org/" target="_blank">juypter</a>.
                </p>

                <p>
                    Once I started sharing some of my COVID-19 analyzes with friends and family, 
                    it started to become tedious to re-run them regularly. 
                    So I spent a weekend putting together a{' '}
                    <a href="https://covid19.slashdave.com/" target="_blank">simple web site</a>, 
                    built on <a href="https://flask.palletsprojects.com/" target="_blank">Flask</a> and 
                    powered by <a href="https://gunicorn.org/" target="_blank">gunicorn</a>/
                    <a href="https://www.nginx.com/" target="_blank">nginx</a>. 
                    For this web site I switched to <a href="https://vega.github.io/vega-lite//" target="_blank">Vega-Lite</a>{' '}
                    in order to provide graphics output more suitable to a web page. 
                    I also employed <a href="https://redis.io/" target="_blank">redis</a> as a data cache, so as 
                    to minimize the load on third-party data sources and to improve performance. 
                    All of the details are on <a href="https://github.com/dwilliams-github/covidweb" target="_blank">github</a>. 
                    It is currently deployed on <a href="https://aws.amazon.com/" target="_blank">AWS</a>.
                </p>


                <h3><a name="robots">Robotics</a></h3>

                <div className="image">
                    <img src={fred} alt="fred" width="180px"/>
                </div>

                <p>
                    I've always been interested in robots, and even as a child I built 
                    little motorized contraptions. In the summer of 2001 I decided (in my spare time) 
                    that I would try to build something a little more serious. The result was the 
                    robot (named "Fred") pictured to the left.
                </p>

                <p>
                    This is before 3D printing was available, so I designed and constructed 
                    Fred's frame from bent aluminum and screws and used a track chassis 
                    I cut out of a motorized plastic toy. Fred is powered by a{' '}
                    <a href="http://handyboard.com/hb/" target="_blank">HandyBoard</a>, a computer 
                    platform build around a Motorola MC68HC11 embedded processor that is primitive 
                    by today's standards. Fred features a sonic range finder, a directional photodetector, 
                    bump switches for collision detection, and dual optical decoder disks to
                     measure wheel rotation.
                </p>

                <p>
                    I wrote Fred's operating system{' '}
                    <a href="https://github.com/dwilliams-github/robots" target="_blank">from scratch</a>{' '} 
                    in a combination of C and assembly.
                </p>

                <div className="image-right">
                    <iframe src="https://player.vimeo.com/video/379925448" width="380" height="200" frameBorder="0" allow="fullscreen" allowFullScreen></iframe>
                </div>

                <p>
                    One of my annual holiday rituals is to log into our Christmas tree and 
                    perform a software update. Which sounds strange, except our Christmas 
                    tree is controlled by a <a href="https://www.raspberrypi.org/" target="_blank">Raspberry Pi</a>.
                </p>

                <p>
                    In it's latest configuration, the tree has 100 LED RGB lights, 
                    each individually programmable. The lights are quite bright and 
                    certain effects can be pretty garish. So as to not to be too distracting, 
                    I have programmed the default light sequence to gently rotate colors.
                    Since the Raspberry Pi has a synchronized clock, I have also programmed 
                    it to turn off late at night and back on in the morning.
                </p>

                <p>
                    You can find details of this project on{' '} 
                    <a href="https://github.com/dwilliams-github/xmastree" target="_blank">GitHub</a>.
                </p>

                <div className="clear"/>

                <h3><a name="classicMac">Classic MacOS Apps</a></h3>

                <p>
                    Between 1988 and 1998 I wrote a bunch of applications for fun for the{' '}
                    <a href="https://en.wikipedia.org/wiki/Classic_Mac_OS" target="_blank">Classic MacOS</a>{' '}  
                    operating system. This operating system has long become obsolete, and the 
                    "event driven" architecture for its applications is quite different 
                    than what we are used to today. Many of the projects were left in 
                    various states of completion. Below are listed, in chronological order, 
                    some of the more functional examples:
                </p>

                <ul>
                    <li>
                        <a href="https://github.com/dwilliams-github/flyer" target="_blank">Flyer</a>: 
                        a black+white real-time video game in the spirit of{' '}
                        <a href="https://en.wikipedia.org/wiki/Asteroids_(video_game)" target="_blank">Asteroids</a>{' '}  
                        driven by a built-in{' '}
                        <a href="https://en.wikipedia.org/wiki/Sprite_(computer_graphics)" target="_blank">sprite library</a>.
                    </li>
                    <li>
                        <a href="https://github.com/dwilliams-github/Mandel" target="_blank">Mandel</a>: 
                        A simple program for graphically exploring the{' '}
                        <a href="https://en.wikipedia.org/wiki/Mandelbrot_set" target="_blank">Mandelbrot set</a>.
                    </li>
                    <li>
                        <a href="https://github.com/dwilliams-github/Henon" target="_blank">Henon</a>: 
                        A simple program for graphically exploring the{' '}
                        <a href="https://en.wikipedia.org/wiki/H%C3%A9non_map" target="_blank">Hénon Map</a>.
                    </li>
                    <li>
                        <a href="https://github.com/dwilliams-github/cridders" target="_blank">Cridders</a>: 
                        An artifical life evolution simulation, with behavior controlled through mutable genes.
                    </li>
                    <li>
                        <a href="https://github.com/dwilliams-github/duit" target="_blank">Duit</a>: 
                        An editor for{' '}
                        <a href="https://en.wikipedia.org/wiki/Doom_WAD" target="_blank">Doom WAD</a> game files.
                    </li>
                </ul>

                <h3><a name="pCT">Computed Tomography</a></h3>

                <p>
                    While at Santa Cruz, in cooperation with the{' '} 
                    <a href="http://scipp.ucsc.edu/" target="_blank">Santa Cruz Institute of Particle Physics</a>{' '} 
                    and the{' '}
                    <a href="http://www.protons.com/index.html" target="_blank">Loma Linda University Medical Center</a>, 
                    I studied the possible application of protons in computed tomography. 
                    Take a peek at the{' '}
                    <a  href="http://scipp.ucsc.edu/pCT/" target="_blank">pCT web site</a> for the latest on this project.
                </p>

                <p>
                    One of the biggest issues with proton computed tomograph (pCT) is how to deal with{' '}
                    <a href="http://pdg.lbl.gov/2005/reviews/passagerpp.pdf" target="_blank">multiple-Coulomb scattering</a>. 
                    I wrote a paper to address this:
                </p>

                <div className="reference">
                    <ol>
                        <li>
                            <a href="public/papers/banana.pdf" target="_blank">
                                The Most Likely Path of an Energetic Charged Particle 
                                Through a Uniform Medium, David C. Williams
                            </a>, Phys.Med.Biol. 49 No 13: (2004) 2899.
                        </li>
                    </ol>
                </div>

                <h3><a name="hep">High-Energy Physics</a></h3>

                <p>
                    The authorship of publications is a <Link to="projects/hepauthors">complicated subject</Link>{' '}  
                    in high-energy physics (I am technically on the author list of some{' '} 
                    <a href="https://orcid.org/0000-0002-4123-9339" target="_blank">470</a> or 
                    so peer-reviewed journal articles). The result is that you will need to trust 
                    me when I say that I actually wrote the following papers. The style follows 
                    the convention of the collaboration under which they were prepared, which 
                    is sometimes very stilted. But you can still get an idea of my technical writing skills.
                </p>

                <div className="reference">
                    <ol>
                        <li>
                            <a href="http://www.arxiv.org/abs/hep-ex/0604030" target="_blank">
                                A Study of the D<sub>sJ</sub>(2317)<sup>+</sup> and 
                                D<sub>sJ</sub>(2460)<sup>+</sup> Mesons in 
                                Inclusive ccbar Production near sqrt(s) = 10.6&nbsp;GeV
                            </a>, 
                            the BaBar Collaboration, Physics Review <b>D74</b> (2006) 032007.
                        </li>
                        <li>
                            <a href="http://www.arxiv.org/abs/hep-ex/0603052" target="_blank">
                                Observation of a Charmed Baryon Decaying to D<sup>0</sup> p 
                                at a Mass Near 2.94 GeV/c<sup>2</sup>
                            </a>, 
                            the BaBar Collaboration, Phys.Rev.Lett. <b>98</b> (2007) 012001.
                        </li>
                        <li>
                            <a href="http://www.arxiv.org/abs/hep-ex/0306003" target="_blank">
                                Limits on D<sup>0</sup> Mixing and CP Violation from the Ratio 
                                of Lifetimes from K<sup>&minus;</sup>&pi;<sup>+</sup>, 
                                K<sup>&minus;</sup>K<sup>+</sup>, and &pi;<sup>&minus;</sup>&pi;<sup>+</sup> 
                                Decays
                            </a>, 
                            the BaBar Collaboration, Phys.Rev.Lett <b>91</b> (2003) 121801.
                        </li>
                        <li>
                            <a href="http://arXiv.org/abs/hep-ex/9905032" target="_blank">
                                Measurement of the High-Q<sup>2</sup> Neutral-Current e<sup>+</sup>p 
                                Deep Inelastic Scattering Cross-Sections at HERA
                            </a>, the ZEUS Collaboration,
                            Eur.Phys.J <b>C11</b> (1999) 427
                        </li>
                        <li>
                            <a href="http://arXiv.org/abs/hep-ex/9905039" target="_blank">
                                Search for Contact Interactions in Deep Inelastic 
                                e<sup>+</sup>p &rarr; e<sup>+</sup> X Scattering at HERA
                            </a>, 
                            the ZEUS Collaboration, Eur.Phys.J <b>C14</b> (2000) 239.
                        </li>
                    </ol>
                </div>

                <p>
                    By the way, if you are curious, they are all typeset using{' '}
                    <a href="http://www.latex-project.org" target="_blank">LaTeX</a>. 
                    I also produced all of the figures.
                </p>

                <p>
                    Here are some papers in which I had a large hand in writing, 
                    but whose scientific results were obtained in collaboration with others.
                </p>

                <div className="reference">
                    <ol>
                        <li>
                            <a href="http://www.arxiv.org/abs/hep-ex/0310050" target="_blank">
                                Observation of a Narrow Meson Decaying to 
                                D<sub>s</sub><sup>+</sup>&pi;<sup>0</sup>&gamma; 
                                at a Mass of 2.458 GeV/c<sup>2</sup>
                            </a>, 
                            the BaBar Collaboration, Phys.Rev. <b>D69</b> (2004) 031101.
                        </li>
                        <li>
                            <a href="http://www.arxiv.org/abs/hep-ex/0304021" target="_blank">
                                Observation of a Narrow Meson Decaying to 
                                D<sub>s</sub><sup>+</sup>&pi;<sup>0</sup> 
                                at a Mass of 2.32 GeV/c<sup>2</sup>
                            </a>, 
                            the BaBar Collaboration, Phys.Rev.Lett. (2003) 242001.
                        </li>
                        <li>
                            <a href="http://arXiv.org/abs/hep-ex/0107052" target="_blank">
                                Properties of Hadronic Final States in Diffractive 
                                Deep Inelastic ep Scattering at HERA
                            </a>, 
                            the ZEUS Collaboration, Phys.Rev. <b>D65</b> (2002) 052001.
                        </li>
                    </ol>
                </div>

                <h3><a name="fiction">Fiction</a></h3>

                <p>
                    I have several (maybe) marketable stories in various stages of completion, 
                    but since I will try to get them published, I won't post them here. Instead, 
                    here are two stories I wrote for writing workshops I attended.
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
        
export default Projects;
import React from 'react';
import { Link } from "react-router-dom";
import Banner from './Banner';
import Side from './Side';
import fred from './images/fred.jpg';
import './css/projects.css';

class Projects extends React.Component {
    render() {
        const sides = [
            {
                title: 'Contents',
                items: [
                    <a href="#robots">Robotics</a>,
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
                    <h3><a name="robots">Robotics</a></h3>

                    <div className="image">
                        <img src={fred} alt="fred" width="250px"/>
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
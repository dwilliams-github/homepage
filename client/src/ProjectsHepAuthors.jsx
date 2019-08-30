import React from 'react';
import { Link } from "react-router-dom";
import './css/styles-site.css';
import './css/projects.css';

class HepAuthors extends React.Component {
    render() {
        return (
            <div className="projects content">
                    <div id="main">
                    <h3>Authorship in High-Energy Physics</h3>
                    <p>
                        Over the decades, as high-energy physics experiments became larger and more complex, the collaboration of physicists that formed to build and run them became larger and larger. These days, high-energy physics collaborations are so large it is almost comical. Some present day examples and their size as of April 2006:
                    </p>
                    <ol>
                        <li>
                            <a href="https://www-public.slac.stanford.edu/babar/">The BaBar Collaboration</a>: 587 <a href="http://www.slac.stanford.edu/babar-internal/colli?letter=showall">members</a> and 396 associates.
                        </li>
                        <li>
                            <a href="http://www.cern.ch/Atlas/">The ATLAS Collaboration</a>: 4400 <a href="http://graybook.cern.ch/programmes/experiments/lhc/ATLAS.html">collaborators</a>
                        </li>
                        <li>
                            <a href="http://cmsinfo.cern.ch/Welcome.html">The CMS Collaboration</a>: 3458 <a href="http://graybook.cern.ch/programmes/experiments/lhc/CMS.html">collaborators</a>
                        </li>
                        <li>
                            <a href="http://www-numi.fnal.gov/Minos/">The MINOS Collaboration</a>: 277 <a href="http://www-numi.fnal.gov/collab/minosinst.txt">collaborators</a>
                        </li>
                    </ol>
                    <p>
                        Despite the size of these collaborations, it is still possible to do unique and important work. For work that produces physics results, it is important to publish the results in a well respected peer-reviewed journal. These huge collaborations are therefore confronted with the question of who gets added to the author list of the papers produced by their members.
                    </p>
                    <p>
                        If they included as authors on each paper just the individuals who contributed directly to the results in the paper, the list would be short (one to perhaps a dozen people ordinarily). However, this would be unfair, since the data used in the paper (having been obtained using a complex apparatus installed in a large laboratory facility) almost certainly relied on the work of many other people.
                    </p>
                    <p>
                        So, what are the choices? Some collaborations maintain a list of official "authors" that is added to every paper. An additional author not on this list might be added if there is good reason to do so. An individual on this list can ask that his name be removed from a paper if he or she disagrees with its conclusions (this happens but is rare). Sometimes membership in this author list is directly related to a monetary contribution from the collaborating institutions. Sometimes membership is contingent on a minimum level of involvement in the experiment, although such schemes rarely work because the level of "involvement" is difficult to quantify.
                    </p>
                    <p>
                        Another approach used by some collaborations is to define a list of "primary" authors, who might, for example, be listed first. Others who wish to be added to the author list might have to specifically request it. They may even have to agree to read and judge the paper first. A good example of such a policy is the <a href="http://belle.kek.jp/belle/rules/publication_policy.txt">one belonging</a> to the <a href="http://belle.kek.jp/">BELLE Collaboration</a>.
                    </p>
                    <p>
                        However, even under the more complex of these author list policies, it is possible for collaboration members in good standing to end up on the author list of a great deal of papers. As an example, as a prior member of three, large collaborations, I am officially the author of over 296 peer-reviewed journal articles, as of May 26, 2006.
                    </p>
                    <p>
                        Yes, that's correct: 296 articles. Many of these I have not even read.
                    </p>
                    <p>
                        You can be a member of one of these collaborations, invent a striking and brilliant new analysis technique, work years on the application of this technique, but then get your name buried in a giant sea of hundreds of co-authors once you finally publish. This is very sad and discouraging.
                    </p>
                    <p>
                        Even worse, you can be a "collaborator" and do absolutely nothing of real value, and still compile hundreds of papers. Who can afford to do absolutely nothing and manage to stay in a collaboration? Well, not the young physicists of course. For faculty, it is not uncommon. And it is the faculty, as the senior members of a collaboration, that usually control the policy.
                    </p>
                    <div id="footer">
                        <Link to="/projects">Back to my projects page</Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default HepAuthors;

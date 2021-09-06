import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import './css/styles-site.css';

const Landing = lazy(() => import('./Landing'));
const About = lazy(() => import('./About'));
const Music = lazy(() => import('./Music'));
const Projects = lazy(() => import('./Projects'));
const ProjectsHepAuthors = lazy(() => import('./ProjectsHepAuthors'));
const Blog = lazy(() => import('./Blog'));
const Links = lazy(() => import('./Links'));
const Resume = lazy(() => import('./Resume'));
const Terms = lazy(() => import('./Terms'));
const NotFound = lazy(() => import('./NotFound'));

const routing = (
    <Router>
        <Suspense fallback={<BeatLoader color="#FFFF99" />}>
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/music" component={Music} />
                <Route path="/projects/hepauthors" component={ProjectsHepAuthors} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/blog" component={Blog} />
                <Route path="/links" component={Links} />
                <Route path="/resume" component={Resume} />
                <Route path="/terms" component={Terms} />
                <Route path="/" exact component={Landing} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


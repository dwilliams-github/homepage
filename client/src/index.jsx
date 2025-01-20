import React, { Suspense, lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import './css/styles-site.css';

const Landing = lazy(() => import('./Landing'));
const About = lazy(() => import('./About'));
const Music = lazy(() => import('./Music'));
const Projects = lazy(() => import('./Projects'));
const HepAuthors = lazy(() => import('./ProjectsHepAuthors'));
const Blog = lazy(() => import('./Blog'));
const Links = lazy(() => import('./Links'));
const Resume = lazy(() => import('./Resume'));
const Terms = lazy(() => import('./Terms'));
const NotFound = lazy(() => import('./NotFound'));

const routing = (
    <Router>
        <Suspense fallback={<BeatLoader color="#FFFF99" />}>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/music" element={<Music />} />
                <Route path="/projects/hepauthors" element={<HepAuthors />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/links" element={<Links />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/" element={<Landing />} />
                <Route element={<NotFound />} />
            </Routes>
        </Suspense>
    </Router>
);

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        {routing}
    </StrictMode>
);


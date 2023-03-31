import React from 'react';
import Topbar from './components/Topbar';
import Content from './components/Content';
import Footer from './components/Footer';

const App: React.FC = () => {

  return (
    <>
      <div className="main">
        <Topbar />
        <Content />
        <Footer />
      </div>
    </>
  );
}

export default App;

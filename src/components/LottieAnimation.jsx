import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const App = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/9dd165ac-abfa-4e5b-9785-3d590ab62b48/NcR51jQWWN.lottie"
      loop
      autoplay
      rendererSettings={{
      preserveAspectRatio: 'xMidYMid slice'
      }}
    />
  );
};


export default App;
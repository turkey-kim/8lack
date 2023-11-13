import {Player} from '@lottiefiles/react-lottie-player';

const LoadingCircle = ({width = '300px', height = '300px'}) => {
  return (
    <Player
      autoplay
      loop
      src="https://lottie.host/53b372a7-cf44-44ba-b0bb-983aa17d5beb/QH7g1FpHbT.json"
      style={{height: '300px', width: '300px'}}
    ></Player>
  );
};

export default LoadingCircle;

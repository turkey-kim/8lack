import {useEffect, useState} from 'react';
import {authCheck} from 'api/auth';
import {useRecoilValue} from 'recoil';
import {loginState} from 'states/atom';

const useAuthCheck = () => {
  const [authorization, setAuthorization] = useState(false); // 토큰 유효성 여부
  const [isLoading, setIsLoading] = useState(true); // 로딩 지연 여부
  const isLoggedIn = useRecoilValue(loginState);

  useEffect(() => {
    const fetch = async () => {
      const res = await authCheck();
      console.log(res.auth);
      if (res.auth) {
        setIsLoading(false);
        setAuthorization(true);
      } else {
        setIsLoading(false);
        setAuthorization(false);
      }
    };

    fetch();
  }, [isLoggedIn]); // 의존성 배열에 로그인 스테이트 연결

  return {authorization, isLoading};
};
// 해당 훅을 사용하는 모든 컴포넌트는 전역 로그인스테이트를 구독하게됩니다! (로그인스테이트가 바뀔 때마다 렌더링)

export default useAuthCheck;

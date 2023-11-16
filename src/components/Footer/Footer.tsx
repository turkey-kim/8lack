import {useState} from 'react';
import styled from 'styled-components';
import {FaGithub, FaSchool} from 'react-icons/fa';
import {theme} from 'styles/Theme';

interface teamMatesProps {
  name: string;
  eMail: string;
  gitRepo: string;
  blog: string;
  etc: {
    etcName: string;
    etcLink: string;
  };
}

export function Footer(): JSX.Element {
  const teamMates: teamMatesProps[] = [
    {
      name: '김민서',
      eMail: '',
      blog: 'https://kmmk808.tistory.com/',
      gitRepo: 'https://github.com/minseokiim',
      etc: {
        etcName: '',
        etcLink: '',
      },
    },
    {
      name: '김특희',
      eMail: '',
      blog: 'https://velog.io/@tkim17',
      gitRepo: 'https://github.com/turkey-kim',
      etc: {
        etcName: '',
        etcLink: '',
      },
    },
    {
      name: '박나영',
      eMail: '',
      blog: 'https://imnayoung.tistory.com/',
      gitRepo: 'https://github.com/im-na0',
      etc: {
        etcName: '',
        etcLink: '',
      },
    },
    {
      name: '장수빈',
      eMail: '',
      blog: 'https://velog.io/@wkdtnqls0506',
      gitRepo: 'https://github.com/wkdtnqls0506',
      etc: {
        etcName: '',
        etcLink: '',
      },
    },
    {
      name: '정범환',
      eMail: '',
      blog: 'https://bumang.tistory.com/',
      gitRepo: 'https://github.com/Bumang-Cyber?tab=repositories',
      etc: {
        etcName: 'Behance',
        etcLink: 'https://www.behance.net/calmness078ad4',
      },
    },
  ];

  const [contributors] = useState<teamMatesProps[]>(teamMates);
  const [goTo, setGoTo] = useState<string>('');

  const onClickGitHub = (): void => {
    setGoTo('https://github.com/turkey-kim/8lack');
  };

  const onClickSchoolLogo = (): void => {
    setGoTo('https://fastcampus.co.kr/');
  };

  return (
    <FooterContainer>
      <InnerDiv>
        <CompanyInfo>
          <DivHeader>8lack</DivHeader>
          <CompanyContent>
            <Logos href={goTo} target="_blank">
              <GithubLogo onClick={onClickGitHub} />
              <SchoolLogo onClick={onClickSchoolLogo} />
            </Logos>
            <span>A Total Solution for Managing Company.</span>
            <span>@ {`${new Date().getFullYear()}`} 팔자좋조. All Right Reserved</span>
          </CompanyContent>
        </CompanyInfo>
        <ContributorsInfo>
          <DivHeader>Contributors</DivHeader>
          <ContributorsContainer>
            {contributors.map((cbtor, i) => {
              return (
                <CbtorDiv key={i}>
                  <CbtorsHeader>{cbtor.name}</CbtorsHeader>
                  {cbtor.blog !== '' && (
                    <CbtorsContents //
                      href={cbtor.blog}
                      target="_blank"
                    >
                      Blog
                    </CbtorsContents>
                  )}
                  {cbtor.eMail !== '' && (
                    <CbtorsContents //
                      href={cbtor.eMail}
                      target="_blank"
                    >
                      E-Mail
                    </CbtorsContents>
                  )}
                  {cbtor.gitRepo !== '' && (
                    <CbtorsContents //
                      href={cbtor.gitRepo}
                      target="_blank"
                    >
                      GitRepo
                    </CbtorsContents>
                  )}
                  {cbtor.etc.etcName !== '' && (
                    <CbtorsContents //
                      href={cbtor.etc.etcLink}
                      target="_blank"
                    >
                      {cbtor.etc.etcName}
                    </CbtorsContents>
                  )}
                </CbtorDiv>
              );
            })}
          </ContributorsContainer>
        </ContributorsInfo>
      </InnerDiv>
    </FooterContainer>
  );
}

export const FooterContainer = styled.div`
  height: 280px;
  width: 100%;
  background-color: ${theme.colors.gray100};
  padding-left: 80px;
  overflow: hidden;
  @media (max-width: 1256px) {
    height: 360px;
  }
`;

export const InnerDiv = styled.div`
  padding: 32px 40px 0 40px;
  display: flex;
  justify-content: space-around;
  gap: 88px;
`;

export const CompanyInfo = styled.div`
  width: 320px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContributorsInfo = styled.div`
  height: 150px;
`;

export const DivHeader = styled.div`
  font-size: ${theme.fonts.subtitle4.fontSize};
  line-height: ${theme.fonts.subtitle4.lineHeight};
  font-weight: 900;
  letter-spacing: -1px;
  color: ${theme.colors.gray700};
`;

export const CompanyContent = styled.div`
  & span {
    display: block;
    font-size: ${theme.fonts.body1.fontSize};
    line-height: ${theme.fonts.body1.lineHeight};
    color: ${theme.colors.gray600};
  }
`;

export const Logos = styled.a`
  margin-top: 24px;
`;

export const GithubLogo = styled(FaGithub)`
  color: ${theme.colors.gray700};
  font-size: 23px;
  margin-bottom: 12px;
  margin-right: 12px;
`;

export const SchoolLogo = styled(FaSchool)`
  color: ${theme.colors.gray700};
  font-size: 26px;
  margin-bottom: 12px;
  transform: translateY(1px);
`;

export const ContributorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 24px 56px;
`;

export const CbtorDiv = styled.div`
  margin-top: 24px;
`;

export const CbtorsHeader = styled.div`
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 500;
  margin-bottom: 8px;
`;
export const CbtorsContents = styled.a`
  display: block;
  font-size: 13px;
  margin-bottom: 4px;
  color: ${theme.colors.gray600};
  &:hover {
    text-decoration: underline;
  }
`;

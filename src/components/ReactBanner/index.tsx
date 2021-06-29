import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, selectCount } from '@/store/reducers/counter';

import logo from './logo.svg';

const Logo = styled.img`
  height: 40vmin;
  pointer-events: none;
`;

const LogoSpin = keyframes({
  'from, to': {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

const Container = styled.div`
  text-align: center;

  @media (prefers-reduced-motion: no-preference) {
    ${Logo} {
      animation: ${LogoSpin} infinite 20s linear;
    }
  }
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Link = styled.a`
  color: #61dafb;
`;

export default function ReactBanner(): JSX.Element {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo" />
        <p>
          <button type="button" onClick={() => dispatch(increment())}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </Link>
      </Header>
    </Container>
  );
}

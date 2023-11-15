import styled, {keyframes} from 'styled-components';

export const leftMove = keyframes`
     0% {
        transform: translateX(0%);
    }
    50% {
        transform: translateX(-100%);
    }
    50.01% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0%);
    }
`;

export const leftMoveForClone = keyframes`
     0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-200%);
    }
`;

export const rightMove = keyframes`
     0% {
        transform: translateX(0%);
    }
    50% {
        transform: translateX(100%);
    }
    50.01% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0%);
    }
`;

export const rightMoveForClone = keyframes`
     0% {
        transform: translateX(-200%);
    }
    100% {
        transform: translateX(0%);
    }
`;

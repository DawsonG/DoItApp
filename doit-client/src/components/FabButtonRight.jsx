import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';

const FloatingButton = styled(Button)`
  position: absolute !important;
  bottom: 16px;
  right: 16px;
`;

const FabButtonRight = ({ type = 'button', color = 'primary', onClick, ariaLabel = 'add', children }) => (
  <FloatingButton type={type} fab color={color} aria-label={ariaLabel} onClick={onClick}>
    {children}
  </FloatingButton>
);

export default FabButtonRight;

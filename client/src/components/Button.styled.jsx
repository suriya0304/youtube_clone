import React from 'react';
import styled from 'styled-components';

export default function Button({ children, ...rest }) {
  const Button = styled.button`
    padding: 5px 15px;
    border: 0.5px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  `;
  return <Button {...rest}>{children}</Button>;
}

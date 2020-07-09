import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import Button from '../../compenents/Button';
import Input from '../../compenents/Input';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça sei logon</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default SignIn;

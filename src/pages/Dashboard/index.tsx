import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './style';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="" />
      <Title>Explore repositórios no Github.</Title>
      <Form>
        <input placeholder="Digite aqui" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="piroca">
          <img src={logo} alt="" />
          <div>
            <strong>ASHDFIUAHS</strong>
            <p>afdovgnaeorfhqawoierfhjqwefwiefqjwoefi</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;

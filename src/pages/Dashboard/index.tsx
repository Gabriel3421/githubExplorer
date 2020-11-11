import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories, Error } from './style';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [nr, setNr] = useState('');
  const [inputErr, setInputErr] = useState('');
  const [repos, setRepos] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!nr) {
      setInputErr('Digite o autor/nome do repo');
      return;
    }
    try {
      const response = await api.get(`repos/${nr}`);
      setRepos([...repos, response.data]);
      setNr('');
      setInputErr('');
    } catch (error) {
      setInputErr('Erro ao buscar repositorio, verifique os dados');
    }
  }

  return (
    <>
      <img src={logo} alt="" />
      <Title>Explore repositórios no Github.</Title>
      <Form hasError={!!inputErr} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite aqui"
          value={nr}
          onChange={e => setNr(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputErr && <Error>{inputErr}</Error>}
      <Repositories>
        {repos.map(repo => (
          <a key={repo.full_name} href="piroca">
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;

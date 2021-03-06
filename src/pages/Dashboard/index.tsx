import React, { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
  const [repos, setRepos] = useState<Repository[]>(() => {
    const storedRepos = localStorage.getItem('@app:repos');
    if (storedRepos) {
      return JSON.parse(storedRepos);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@app:repos', JSON.stringify(repos));
  }, [repos]);

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
          <Link key={repo.full_name} to={`/repository/${repo.full_name}`}>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;

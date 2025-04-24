import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';




export default function GithubUserSearch() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (username.trim() === '') {
      setUserData(null);
      setError('Digite um nome de usuário.');
      return;
    }

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('Usuário não encontrado');

      const data = await res.json();
      setUserData(data);
      setError('');
    } catch (err) {
      setUserData(null);
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Buscar Usuário no GitHub</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Digite o nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        {error && <div className="alert alert-danger mt-4">{error}</div>}

        {userData && (
          <div className="text-center mt-4">
            <img
              src={userData.avatar_url}
              alt={userData.name}
              className="rounded-circle mb-3"
              width="120"
              height="120"
            />
            <h4>{userData.name || 'Nome não disponível'}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

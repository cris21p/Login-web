import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './styles.css';

const apiBaseUrl = '/api';

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);

  const EyeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
    </svg>
  );
  const EyeSlashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
    </svg>
  );

  const handleModeChange = (e) => {
    setDarkMode(e.target.checked);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setRegisterMessage('');
    setLoginMessage('');
  };

  const handleShowLogin = () => {
    setShowRegister(false);
    setRegisterMessage('');
    setLoginMessage('');
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    try {
      const res = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setLoginMessage('Login exitoso');
        // Aquí podrías redirigir o guardar el usuario en el estado
      } else {
        setLoginMessage(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setLoginMessage('Error de conexión');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const correo = form.correo.value;
    const contraseña = form.contraseña.value;
    const fecha_de_nacimiento = form.fecha_de_nacimiento.value;
    try {
      const res = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña, fecha_de_nacimiento })
      });
      const data = await res.json();
      if (res.ok) {
        setRegisterMessage(data.message);
        setTimeout(() => {
          setShowRegister(false);
          setRegisterMessage('');
        }, 2000);
      } else {
        setRegisterMessage(data.message || 'Error al registrar');
      }
    } catch (err) {
      setRegisterMessage('Error de conexión');
    }
  };

  return (
    <div className={darkMode ? 'body-login' : 'body-login'} style={{ backgroundColor: darkMode ? '#333' : '#fff' }}>
      <main className="login">
        <div className="form-check form-switch pt-sw">
          <input
            className="form-check-input pt"
            type="checkbox"
            id="checkNativeSwitch"
            checked={darkMode}
            onChange={handleModeChange}
          />
          <p className="p" style={{ color: darkMode ? '#ffffffb1' : '#2222229f' }}>
            {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
          </p>
          <label className="form-check-label" htmlFor="checkNativeSwitch"></label>
        </div>
        {!showRegister ? (
          <div className="form-container">
            <h1 style={{ textAlign: 'center' }}>
              <a href="index.html">Login-Wed</a>
            </h1>
            <form onSubmit={handleLoginSubmit}>
                <div style={{ position: 'relative', width: '220px', margin: '0 auto', paddingBottom: '0px', height: '50px' }}>
                    <input className="contra ct" type="text" id="username" name="username" placeholder="Username" required />
                </div>
              <br />
              <div style={{ position: 'relative', width: '220px', margin: '0 auto' }}>
                <input
                  className="password"
                  type={showPasswordLogin ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  placeholder="Password"
                  style={{ width: '100%' }}
                />
                <button
                  type="button"
                  style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#3e98bf', display: 'flex', alignItems: 'center'}}
                  onClick={() => setShowPasswordLogin((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPasswordLogin ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPasswordLogin ? EyeSlashIcon : EyeIcon}
                </button>
              </div>
              <div className="remember-me">
                <a href="">¿Olvidaste la contraseña?</a>
                <button className="crear" type="button" onClick={handleShowRegister}>
                  Registrar
                </button>
                <button className="bt" type="submit" style={{ fontSize: '19px' }}>
                  Login
                </button>
              </div>
              {loginMessage && (
                <div className="alert alert-info mt-2" role="alert">
                  {loginMessage}
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="register" style={{ display: 'flex' }}>
            <h2>
              <a href="index.html">login-Wed</a>
            </h2>
            <form onSubmit={handleRegisterSubmit}>
                <div style={{ position: 'relative', width: '220px', margin: '0 auto' }} >
                    <input className="contra" type="email" id="correo" required name="correo" placeholder="Correo" />
                </div>
              <div style={{ position: 'relative', width: '220px', margin: '0 auto' }}>
                <input
                  className="password"
                  type={showPasswordRegister ? 'text' : 'password'}
                  id="contraseña"
                  required
                  name="contraseña"
                  placeholder="Contraseña"
                  style={{ width: '100%' }}
                />
                <button
                  type="button"
                  style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#3e98bf', display: 'flex', alignItems: 'center'}}
                  onClick={() => setShowPasswordRegister((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPasswordRegister ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPasswordRegister ? EyeSlashIcon : EyeIcon}
                </button>
              </div>
                <div style={{ position: 'relative', width: '220px', margin: '0 auto' }}>
                    <input className="fecha" type="date" id="fecha_de_nacimiento" required name="fecha_de_nacimiento" placeholder="Fecha de Nacimiento"/>
                </div>
              <div className="remember-me">
                <button className="log" type="button" onClick={handleShowLogin}>
                  ¿Ya tienes una cuenta?
                </button>
                <button className="bt" type="submit">
                  Registrar
                </button>
              </div>
              {registerMessage && (
                <div className="alert alert-info mt-2" role="alert">
                  {registerMessage}
                </div>
              )}
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

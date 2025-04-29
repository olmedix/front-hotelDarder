import React, { useState } from "react";
import LoginPage, { Password, Footer } from "@react-login-page/page8";
import { Header } from "../components/Header";

export function LoginRegister() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitch = () => setIsRegistering(!isRegistering);

  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      <Header />

      <LoginPage style={{ height: "auto", paddingBottom: "2rem" }}>
        {/* SWITCH */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          {isRegistering ? (
            <>
              ¿Ya tienes cuenta?{" "}
              <a href="#" onClick={handleSwitch}>
                Inicia sesión
              </a>
            </>
          ) : (
            <>
              ¿No tienes cuenta?{" "}
              <a href="#" onClick={handleSwitch}>
                Regístrate aquí
              </a>
            </>
          )}
        </div>

        {/* FORMULARIO LOGIN */}
        {!isRegistering && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                type="email"
                required
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
              />
            </div>
            <Password visible={false} />
            <Password
              panel="signup"
              visible={false}
              keyname="confirm-password"
            />
          </>
        )}

        {/* FORMULARIO REGISTRO */}
        {isRegistering && (
          <section className="bg-white text-black p-4 rounded-lg shadow-md">
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                placeholder="Nombre"
                type="text"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="firstLastName">Primer apellido</label>
              <input
                id="firstLastName"
                name="firstLastName"
                placeholder="Apellido paterno"
                type="text"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="secondLastName">Segundo apellido</label>
              <input
                id="secondLastName"
                name="secondLastName"
                placeholder="Apellido materno (opcional)"
                type="text"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="gender">Género</label>
              <select id="gender" name="gender" required style={inputStyle}>
                <option value="">Selecciona...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="identityDocument">Documento de identidad</label>
              <input
                id="identityDocument"
                name="identityDocument"
                placeholder="DNI o similar"
                type="text"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="nationality">Nacionalidad</label>
              <input
                id="nationality"
                name="nationality"
                placeholder="Ej. Española"
                type="text"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="birthDate">Fecha de nacimiento</label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="residence">Residencia</label>
              <input
                id="residence"
                name="residence"
                placeholder="Ciudad de residencia"
                type="text"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="fullAddress">Dirección completa</label>
              <input
                id="fullAddress"
                name="fullAddress"
                placeholder="Dirección completa"
                type="text"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                name="phone"
                placeholder="Número de teléfono"
                type="tel"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                placeholder="Correo electrónico"
                type="email"
                required
                style={inputStyle}
              />
            </div>
            <Password visible={false} />
            <Password
              panel="signup"
              visible={false}
              keyname="confirm-password"
            />
          </section>
        )}

        {/* Footer común */}
        <Footer>© Tu aplicación</Footer>
      </LoginPage>
    </div>
  );
}

// Estilo básico para los inputs
const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "4px",
};

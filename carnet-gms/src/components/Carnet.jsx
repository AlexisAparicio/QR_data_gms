import './Carnet.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function Carnet() {
  const { token } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      setLoading(true);

      const { data, error } = await supabase
        .from('colaboradores_gms')
        .select('*')
        .eq('public_token', token)
        .single();

      if (error) {
        console.error('Error loading employee:', error);
        setEmployee(null);
      } else {
        setEmployee(data);
      }

      setLoading(false);
    }

    if (token) {
      fetchEmployee();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <h1 className="loading-message">Loading...</h1>;
  }

  if (!employee) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Persona no encontrada</h2>
          <p>
            Persona no encontrada en nuestra base de datos.
            <br />
            Por favor, contacte al administrador.
          </p>
        </div>
      </div>
    );
  }

  const isActive = employee.status?.toUpperCase() === 'ACTIVO';
  const statusClass = isActive ? 'active' : 'inactive';

  const imageUrl =
    `https://tijlndsxdomhkudsobhc.supabase.co/storage/v1/object/public/${employee.foto_colaborador}`;

  const logoUrl =
    'https://tijlndsxdomhkudsobhc.supabase.co/storage/v1/object/public/colaboradores/GMS_logo_redimensionado.jpeg';

  return (
    <div className="carnet-container">
      <div className={`carnet-card ${statusClass}`}>
        <h1>Carnet Digital</h1>
        <h2 className="company-name">Global Mind-Solutions</h2>

        <img
          src={imageUrl}
          alt={`${employee.nombre} ${employee.apellido}`}
          className="employee-image"
        />

        <h2 className="employee-name">
          {employee.nombre} {employee.apellido}
        </h2>

        <p>{employee.cargo}</p>
        <p>{employee.departamento}</p>

        <span className={`status ${statusClass}`}>
          {employee.status}
        </span>

        <div className="logo-container">
          <img
            src={logoUrl}
            alt="Global Mind-Solutions"
            className="company-logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Carnet;
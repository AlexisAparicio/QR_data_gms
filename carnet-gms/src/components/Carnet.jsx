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
      const { data, error } = await supabase
        .from('colaboradores_gms')
        .select('*')
        .eq('public_token', token)
        .single();

      if (!error) {
        setEmployee(data);
      }

      setLoading(false);
    }

    fetchEmployee();
  }, [token]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // EMPLOYEE NOT FOUND
  if (!employee) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Person no encontrada</h2>
          <p>
            Persona no encontrada en nuestra base de datos.
            <br />
            porfavor contacte al administrador.
          </p>
        </div>
      </div>
    );
  }

  // EMPLOYEE INACTIVE
  if (employee.status === 'INACTIVO') {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Access Denied</h2>
          <p>
            Person not found at our database.
            <br />
            Please call the administrator.
          </p>
        </div>
      </div>
    );
  }

  const imageUrl = `https://tijlndsxdomhkudsobhc.supabase.co/storage/v1/object/public/${employee.foto_colaborador}`;

  return (
    <div className="carnet-container">
      <div className="carnet-card">
        <h1>Carnet Digital</h1>

        <img
          src={imageUrl}
          alt="Employee"
          className="employee-image"
        />

        <h2 classNAme="Tittle">
          {employee.nombre} {employee.apellido}
        </h2>

        <p>{employee.cargo}</p>
        <p>{employee.departamento}</p>

        <span className="status">
          {employee.status}
        </span>
      </div>
    </div>
  );
}

export default Carnet;
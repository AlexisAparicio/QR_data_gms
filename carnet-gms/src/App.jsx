import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';

function App() {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  async function fetchEmployee() {
    const { data, error } = await supabase
      .from('colaboradores_gms')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.error(error);
    } else {
      setEmployee(data);
    }
  }

  if (!employee) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '15px',
      textAlign: 'center'
    }}>
      <h1>Digital Carnet</h1>

      <h2>
        {employee.nombre} {employee.apellido}
      </h2>

      <p>
        <strong>Cargo:</strong> {employee.cargo}
      </p>

      <p>
        <strong>Departamento:</strong> {employee.departamento}
      </p>

      <p>
        <strong>Status:</strong> {employee.status}
      </p>
    </div>
  );
}

export default App;
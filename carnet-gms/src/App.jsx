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
    .eq('id', 2)
    .single();

  console.log('DATA:', data);
  console.log('ERROR:', error);

  if (error) {
    console.error(error);
    return;
  }

  setEmployee(data);
}

  if (!employee) {
    return <h1>Loading...</h1>;
  }

  const imageUrl = `https://tijlndsxdomhkudsobhc.supabase.co/storage/v1/object/public/${employee.foto_colaborador}`;

  return (

    <div style={{

      maxWidth: '400px',

      margin: '50px auto',

      padding: '20px',

      border: '1px solid #ccc',

      borderRadius: '15px',

      textAlign: 'center',

      background: '#111827',

      color: 'white'

    }}>

      <h1>Digital Carnet</h1>

      <img

        src={imageUrl}

        alt="Employee"

        style={{

          width: '120px',

          height: '120px',

          borderRadius: '50%',

          objectFit: 'cover',

          marginBottom: '20px',

          border: '3px solid white'

        }}

      />

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
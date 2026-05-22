import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';

function Carnet() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      const { data, error } = await supabase
        .from('colaboradores_gms')
        .select('*')
        .eq('id', id)
        .single();

      if (!error) setEmployee(data);
    }

    fetchEmployee();
  }, [id]);

  if (!employee) return <h1>Loading...</h1>;

  const imageUrl = `https://tijlndsxdomhkudsobhc.supabase.co/storage/v1/object/public/${employee.foto_colaborador}`;

  return (
    <div>
      <h1>Digital Carnet</h1>
      <img src={imageUrl} alt="Employee" width="120" />
      <h2>{employee.nombre} {employee.apellido}</h2>
      <p>{employee.cargo}</p>
      <p>{employee.departamento}</p>
      <p>{employee.status}</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/carnet/:id" element={<Carnet />} />
      </Routes>
    </BrowserRouter>
  );
}
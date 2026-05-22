import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function CarnetDigital() {
  const [colaborador, setColaborador] = useState(null);

  useEffect(() => {
    async function fetchColaborador() {
      const id = window.location.pathname.split('/').pop();

      const { data, error } = await supabase
        .from('colaboradores_gms')
        .select('*')
        .eq('id', id)
        .single();

      if (!error) setColaborador(data);
    }

    fetchColaborador();
  }, []);

  if (!colaborador) return <p>Cargando...</p>;

  const { data: foto } = supabase
    .storage
    .from('colaboradores')
    .getPublicUrl(colaborador.foto_colaborador);

  return (
    <div style={{ maxWidth: 360, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 16 }}>
      <img
        src={foto.publicUrl}
        alt="Foto colaborador"
        style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
      />

      <h2>{colaborador.nombre} {colaborador.apellido}</h2>
      <p><strong>Cargo:</strong> {colaborador.cargo}</p>
      <p><strong>Departamento:</strong> {colaborador.departamento}</p>
      <p><strong>Empresa:</strong> {colaborador.empresas_adjuntas?.join(', ')}</p>
      <p><strong>Status:</strong> {colaborador.status}</p>
    </div>
  );
}
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Las variables de entorno de Supabase no están definidas.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetches the website configuration from Supabase.
 * @param {string} websiteSlug - The slug of the website to fetch config for.
 * @returns {Promise<object | null>} The website configuration object or null if not found.
 */
export async function getWebsiteConfig(websiteSlug) {
  try {
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .select('id')
      .eq('slug', websiteSlug)
      .limit(1) // Soluciona el error de resultados duplicados
      .single();

    if (websiteError) {
      console.error('Error fetching website ID:', websiteError.message);
      return null;
    }
    
    if (!websiteData) {
        console.error(`No website found with slug: ${websiteSlug}`);
        return null;
    }

    // Usamos el nombre correcto de la tabla: "site_configurations"
    const { data, error } = await supabase
      .from('site_configurations')
      .select('key, value')
      .eq('website_id', websiteData.id);

    if (error) {
      console.error('Error fetching website config:', error.message);
      return null;
    }

    const config = data.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});

    return config;

  } catch (error) {
    console.error('An unexpected error occurred en getWebsiteConfig:', error.message);
    return null;
  }
}

export async function getWinnersForSite(websiteSlug) {
  try {
    // 1. Primero, obtenemos el ID del sitio web usando el slug.
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .select('id')
      .eq('slug', websiteSlug)
      .single();

    if (websiteError || !websiteData) {
      console.error('No se pudo encontrar el sitio para buscar ganadores:', websiteError?.message);
      return []; // Devolvemos un array vacío si no encontramos el sitio.
    }

    const websiteId = websiteData.id;

    // 2. Usamos el ID para buscar en la nueva tabla 'ganadores'.
    const { data, error } = await supabase
      .from('ganadores')
      .select('nombre_ganador, nombre_premio, fecha_sorteo')
      .eq('website_id', websiteId)
      .order('fecha_sorteo', { ascending: false }); // Ordenamos del más reciente al más antiguo.

    if (error) {
      console.error('Error fetching winners:', error.message);
      return []; // Devolvemos un array vacío si hay un error.
    }

    return data;

  } catch (error) {
    console.error('An unexpected error occurred in getWinnersForSite:', error.message);
    return [];
  }
}

export async function getLatestWinnerForSite(websiteSlug) {
  try {
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .select('id')
      .eq('slug', websiteSlug)
      .single();

    if (websiteError || !websiteData) {
      console.error('No se pudo encontrar el sitio para buscar ganadores:', websiteError?.message);
      return null;
    }

    const websiteId = websiteData.id;

    const { data, error } = await supabase
      .from('ganadores')
      .select('nombre_ganador, nombre_premio')
      .eq('website_id', websiteId)
      .order('fecha_sorteo', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching latest winner:', error.message);
      return null;
    }

    return data;

  } catch (error) {
    console.error('An unexpected error occurred in getLatestWinnerForSite:', error.message);
    return null;
  }
}

export async function getRitualsForSite(websiteSlug) {
  try {
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .select('id')
      .eq('slug', websiteSlug)
      .single();

    if (websiteError || !websiteData) {
      console.error('No se pudo encontrar el sitio para buscar rituales:', websiteError?.message);
      return [];
    }

    const websiteId = websiteData.id;

    const { data, error } = await supabase
      .from('rituales')
      .select('*') // Traemos todos los campos
      .eq('website_id', websiteId)
      .order('created_at', { ascending: true }); // O el orden que prefieras

    if (error) {
      console.error('Error fetching rituals:', error.message);
      return [];
    }

    return data;
  } catch (error) {
    console.error('An unexpected error occurred in getRitualsForSite:', error.message);
    return [];
  }
}
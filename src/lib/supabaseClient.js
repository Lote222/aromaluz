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
      .limit(1)
      .single();

    if (websiteError) {
      console.error('Error fetching website ID:', websiteError.message);
      return null;
    }
    
    if (!websiteData) {
        console.error(`No website found with slug: ${websiteSlug}`);
        return null;
    }

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
    console.error('An unexpected error occurred in getWebsiteConfig:', error.message);
    return null;
  }
}

/**
 * Fetches the last 5 winners for a site with a draw date up to today.
 * @param {string} websiteSlug - The slug of the website.
 * @returns {Promise<Array>} A list of winner objects.
 */
export async function getWinnersForSite(websiteSlug) {
  try {
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .select('id')
      .eq('slug', websiteSlug)
      .single();

    if (websiteError || !websiteData) {
      console.error('No se pudo encontrar el sitio para buscar ganadores:', websiteError?.message);
      return [];
    }

    const websiteId = websiteData.id;
    // Set date to today at midnight to include all of today's winners
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const todayISO = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    const { data, error } = await supabase
      .from('ganadores')
      .select('nombre_ganador, nombre_premio, fecha_sorteo')
      .eq('website_id', websiteId)
      // Filter for draw dates less than or equal to today
      .lte('fecha_sorteo', todayISO)
      .order('fecha_sorteo', { ascending: false }) // Order from most recent to oldest
      .limit(5); // Limit to the last 5 winners

    if (error) {
      console.error('Error fetching winners:', error.message);
      return [];
    }

    return data;

  } catch (error) {
    console.error('An unexpected error occurred in getWinnersForSite:', error.message);
    return [];
  }
}

/**
 * Fetches the single latest winner for a site with a draw date up to today.
 * @param {string} websiteSlug - The slug of the website.
 * @returns {Promise<object | null>} The latest winner object or null.
 */
export async function getLatestWinnerForSite(websiteSlug) {
  try {
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .select('id')
      .eq('slug', websiteSlug)
      .single();

    if (websiteError || !websiteData) {
      console.error('No se pudo encontrar el sitio para buscar el último ganador:', websiteError?.message);
      return null;
    }

    const websiteId = websiteData.id;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const todayISO = today.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('ganadores')
      .select('nombre_ganador, nombre_premio')
      .eq('website_id', websiteId)
      .lte('fecha_sorteo', todayISO)
      .order('fecha_sorteo', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // It's common for no winner to be found, so we don't need to log this as a critical error.
      console.log('No latest winner found or query error:', error.message);
      return null;
    }

    return data;

  } catch (error) {
    console.error('An unexpected error occurred in getLatestWinnerForSite:', error.message);
    return null;
  }
}

/**
 * Fetches all rituals for a given website slug.
 * @param {string} websiteSlug - The slug of the website.
 * @returns {Promise<Array>} A list of ritual objects.
 */
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
      .select('*')
      .eq('website_id', websiteId)
      .order('created_at', { ascending: true });

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
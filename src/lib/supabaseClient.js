// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Las variables de entorno de Supabase no están definidas.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getWebsiteIdBySlug(websiteSlug) {
  const { data, error } = await supabase
    .from('websites')
    .select('id')
    .eq('slug', websiteSlug)
    .single();

  if (error) {
    console.error(`Error fetching website ID for slug ${websiteSlug}:`, error.message);
    return null;
  }
  return data.id;
}

export async function getWebsiteConfig(websiteSlug) {
  const websiteId = await getWebsiteIdBySlug(websiteSlug);
  if (!websiteId) return null;
  const { data, error } = await supabase.from('site_configurations').select('key, value').eq('website_id', websiteId);
  if (error) return null;
  return data.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
}

export async function getRitualsForSite(websiteSlug) {
  const websiteId = await getWebsiteIdBySlug(websiteSlug);
  if (!websiteId) return [];
  const { data, error } = await supabase.from('rituales').select('*').eq('website_id', websiteId).order('created_at', { ascending: true });
  if (error) return [];
  return data;
}

// FIX: Se añade la función robusta para obtener los datos del Sorteo Fortuna.
export async function getSorteoFortunaData(websiteSlug) {
  const websiteId = await getWebsiteIdBySlug(websiteSlug);
  if (!websiteId) {
    return { latestPastDraw: null, nextFutureDraw: null, history: [] };
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    const [pastDrawsResult, nextFutureDrawResult] = await Promise.all([
      supabase
        .from('sorteos_fortuna')
        .select('*')
        .eq('website_id', websiteId)
        .lte('fecha_sorteo', today)
        .order('fecha_sorteo', { ascending: false })
        .limit(6),
      supabase
        .from('sorteos_fortuna')
        .select('*')
        .eq('website_id', websiteId)
        .gt('fecha_sorteo', today)
        .order('fecha_sorteo', { ascending: true })
        .limit(1)
    ]);

    const { data: pastDraws, error: pastError } = pastDrawsResult;
    if (pastError) console.error("Error fetching past draws:", pastError.message);

    const { data: nextDraws, error: futureError } = nextFutureDrawResult;
    if (futureError) console.error("Error fetching future draws:", futureError.message);

    const latestPastDraw = pastDraws?.[0] || null;
    const history = pastDraws?.slice(1) || [];
    const nextFutureDraw = nextDraws?.[0] || null;

    return { latestPastDraw, nextFutureDraw, history };
  } catch (error) {
    console.error('Error in getSorteoFortunaData:', error.message);
    return { latestPastDraw: null, nextFutureDraw: null, history: [] };
  }
}
import 'react-native-url-polyfill/auto';
import { createClient } from "@supabase/supabase-js";

const supabase_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laXpjbXludHR4d2p5Ym93ZWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU3MTQ1MDksImV4cCI6MjAwMTI5MDUwOX0.vPuwffDhQP15j2cAJnWS1Mlv0qGbsqTSuuTNjeQ1uTU";
const supabase_url = "https://meizcmynttxwjybowelh.supabase.co";
const imageUrl =     `${supabase_url}/storage/v1/object/public/images/userImage/`;
const supabase = createClient(supabase_url, supabase_Key);

export default supabase;
export {imageUrl}

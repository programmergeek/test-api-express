const {createClient} = require('@supabase/supabase-js')

export const supabase = createClient(process.env.DATABASE_URL, process.env.DATABASE_KEY)
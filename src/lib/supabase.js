
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbrjlrrbruvpvoaclwaj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicmpscnJicnV2cHZvYWNsd2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4MjA1NzcsImV4cCI6MTk4NTM5NjU3N30.RQY_59lUZHB-ipQWHGRt06JZSSa4acEHSArxo2KzYkI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
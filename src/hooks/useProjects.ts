import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  link: string
  order_index: number
  created_at: string
  updated_at: string
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      console.log('Supabase response:', { data, error })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      console.log('Projects loaded:', data)
      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { projects, loading, error, refetch: fetchProjects }
}

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Defines the structure of a project entity from the database.
 * @interface Project
 * @property {string} id - Unique identifier for the project (UUID)
 * @property {string} title - Display title of the project
 * @property {string} description - Detailed project description
 * @property {string[]} tags - Array of technology tags associated with the project
 * @property {string} link - External URL to the project (optional)
 * @property {number} order_index - Display order for sorting projects
 * @property {string} created_at - Timestamp when project was created
 * @property {string} updated_at - Timestamp when project was last updated
 */
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

/**
 * Custom React hook for managing project data from Supabase.
 * Provides state management for projects, loading states, and error handling.
 * 
 * @returns {UseProjectsReturn} Object containing projects data, loading state, error state, and refetch function
 * 
 * @example
 * ```tsx
 * const { projects, loading, error, refetch } = useProjects();
 * if (loading) return <LoadingSkeleton />;
 * if (error) return <ErrorDisplay error={error} />;
 * return <ProjectList projects={projects} />;
 * ```
 */
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches project data from Supabase database.
   * Manages loading states, error handling, and data updates.
   * 
   * @async
   * @returns {Promise<void>} Updates the component state with fetched data or error
   * @throws {Error} When Supabase query fails or network error occurs
   */
  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      // Query projects table with ordering by display index
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects()
  }, [])

  /**
   * Return object with state management for projects
   * @typedef {Object} UseProjectsReturn
   * @property {Project[]} projects - Array of fetched projects
   * @property {boolean} loading - Loading state indicator
   * @property {string|null} error - Error message or null if no error
   * @property {Function} refetch - Function to manually refetch projects
   */
  return { projects, loading, error, refetch: fetchProjects }
}

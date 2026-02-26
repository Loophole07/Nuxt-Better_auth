/// <reference types="nuxt" />
import { ofetch } from 'ofetch'

const BASE = 'https://api.github.com'

export interface GHUser {
  id: number
  login: string
  name: string
  avatar_url: string
  bio: string
  followers: number
  following: number
  public_repos: number
  html_url: string
  location: string
  blog: string
  created_at: string
}

export interface GHRepo {
  id: number
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  html_url: string
  language: string
  updated_at: string
}

export interface LanguageStat {
  language: string
  count: number
  percentage: number
}

export const useGitHub = () => {
  const getUser = (username: string) =>
    ofetch<GHUser>(`${BASE}/users/${username}`)

  const getRepos = (username: string) =>
    ofetch<GHRepo[]>(`${BASE}/users/${username}/repos?sort=stars&per_page=30`)

  const getLanguageStats = (repos: GHRepo[]): LanguageStat[] => {
    const counts: Record<string, number> = {}
    repos.forEach(repo => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1
      }
    })
    const total = Object.values(counts).reduce((a, b) => a + b, 0)
    return Object.entries(counts)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
  }

  return { getUser, getRepos, getLanguageStats }
}
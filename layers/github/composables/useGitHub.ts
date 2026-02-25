/// <reference types="nuxt" />
import { ofetch } from 'ofetch'

const BASE = 'https://api.github.com'

export interface GHUser {
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

export const useGitHub = () => {
  const getUser = (username: string) =>
    ofetch<GHUser>(`${BASE}/users/${username}`)

  const getRepos = (username: string) =>
    ofetch<GHRepo[]>(`${BASE}/users/${username}/repos?sort=stars&per_page=10`)

  return { getUser, getRepos }
}
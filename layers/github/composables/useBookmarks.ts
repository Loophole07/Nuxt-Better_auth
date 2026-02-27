import { ref } from 'vue'

interface BookmarkedUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  followers: number
  following: number
  public_repos: number
  html_url: string
}

const bookmarks = ref<BookmarkedUser[]>([])

const loadFromStorage = () => {
  if (process.client) {
    const stored = localStorage.getItem('gh-bookmarks')
    bookmarks.value = stored ? JSON.parse(stored) : []
  }
}

const saveToStorage = () => {
  if (process.client) {
    localStorage.setItem('gh-bookmarks', JSON.stringify(bookmarks.value))
  }
}

export const useBookmarks = () => {
  // load on first use
  if (bookmarks.value.length === 0) loadFromStorage()

  const add = (user: BookmarkedUser) => {
    if (!bookmarks.value.find(b => b.login === user.login)) {
      bookmarks.value.push(user)
      saveToStorage()
    }
  }

  const remove = (login: string) => {
    bookmarks.value = bookmarks.value.filter(b => b.login !== login)
    saveToStorage()
  }

  const isBookmarked = (login: string) => {
    return bookmarks.value.some(b => b.login === login)
  }

  return { bookmarks, add, remove, isBookmarked }
}
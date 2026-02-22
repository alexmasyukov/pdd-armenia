import { Favorites, QuestionId } from '../types'

export class FavoriteStore {
  private static favoritesKey = 'favorite-2026'
  private static initialFavorites: Favorites = []

  static getFavorites = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem(FavoriteStore.favoritesKey) ?? '[]') as Favorites

      if (!Array.isArray(favorites)) {
        return FavoriteStore.initialFavorites
      }

      return favorites
    } catch (_) {
      return FavoriteStore.initialFavorites
    }
  }

  static cleanFavorites = () => {
    localStorage.removeItem(FavoriteStore.favoritesKey)
  }

  static hasQuestionIdInFavorites(questionId: QuestionId): boolean {
    const favorites = FavoriteStore.getFavorites()

    return favorites?.includes(questionId) || (favorites as unknown as number[])?.includes(+questionId)
  }

  static addQuestionIdToFavorites(questionId: QuestionId): void {
    const favorites = FavoriteStore.getFavorites()

    if (!favorites.includes(questionId)) {
      favorites.push(questionId)
      localStorage.setItem(FavoriteStore.favoritesKey, JSON.stringify(favorites))
    }
  }

  static removeQuestionIdFromFavorites(questionId: QuestionId): void {
    const favorites = FavoriteStore.getFavorites()

    if (favorites.includes(questionId)) {
      const index = favorites.indexOf(questionId)
      favorites.splice(index, 1)
      localStorage.setItem(FavoriteStore.favoritesKey, JSON.stringify(favorites))
    }
  }
}

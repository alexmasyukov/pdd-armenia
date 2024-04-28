export const routes = {
  home: {
    path: '/',
    titleI18nKey: 'home',
  },
  topics: {
    path: '/topics',
    titleI18nKey: 'topics',
    topicById: {
      path: '/topics/:id',
      view: (id: string) => `/topics/${id}`,
    },
  },
  favorite: {
    path: '/favorite',
    titleI18nKey: 'favorite',
    favoritesByTopicId: {
      path: '/favorite/:id',
      view: (id: string) => `/favorite/${id}`,
    },
  },
  errors: {
    path: '/errors',
    titleI18nKey: 'errors',
  },
};

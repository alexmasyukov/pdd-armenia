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
  detailedTopics: {
    path: '/detailed-topics',
    titleI18nKey: 'detailed-topics',
    topicById: {
      path: '/detailed-topics/:id',
      view: (id: string) => `/detailed-topics/${id}`,
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
  checkQuestions: {
    path: '/check-questions',
    titleI18nKey: 'check-questions',
  },
  errors: {
    path: '/errors',
    titleI18nKey: 'errors',
  },
};

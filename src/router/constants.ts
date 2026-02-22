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
  topicErrors: {
    path: '/topic-errors',
    titleI18nKey: 'isErrors',
    errorsByTopicId: {
      path: '/topic-errors/:id',
      view: (id: string) => `/topic-errors/${id}`,
    },
  },
  checkQuestions2026OnlyBlocks: {
    path: '/check-questions-2026-only-blocks',
    titleI18nKey: 'check-questions-2026-only-blocks',
  },
  errors: {
    path: '/errors',
    titleI18nKey: 'errors',
  },
}

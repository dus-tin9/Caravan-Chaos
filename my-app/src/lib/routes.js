export const DEFAULT_LEVEL_ID = 1;

export const routes = {
  main: '/main',
  settings: '/settings',
  highscore: '/highscore',
  levelSelect: '/levels',
  levelRoot: '/level',
  levelById: (levelId) => `/level/${levelId}`,
  levelRecap: (levelId) => `/level/${levelId}/recap`,
};

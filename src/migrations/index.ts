import * as migration_20241120_165459_initial from './20241120_165459_initial';

export const migrations = [
  {
    up: migration_20241120_165459_initial.up,
    down: migration_20241120_165459_initial.down,
    name: '20241120_165459_initial'
  },
];

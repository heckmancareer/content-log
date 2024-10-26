const BASIC_ENTITY_SORT: SortLabel[] = [
  {
    field: '_userRating',
    label: 'User Rating'
  },
  {
    field: 'title',
    label: 'Title'
  },
  {
    field: 'releaseDate',
    label: 'Release Date'
  },
  {
    field: 'userDateStarted',
    label: 'Date Started'
  },
  {
    field: 'userDateAdded',
    label: 'Date Added'
  },
  {
    field: 'completionStatus',
    label: 'Completion Status'
  }
]

export const MOVIE_ENTITY_SORT: SortLabel[] = [
  ...BASIC_ENTITY_SORT,
  {
    field: 'runtime',
    label: 'Runtime',
    suffix: 'Minutes'
  },
  {
    field: 'director',
    label: 'Director'
  },
  {
    field: 'writer',
    label: 'Writer'
  },
]

export const VIDEO_GAME_ENTITY_SORT: SortLabel[] = [
  ...BASIC_ENTITY_SORT,
  {
    field: 'developer',
    label: 'Developer'
  },
  {
    field: 'publisher',
    label: 'Publisher',
  },
  {
    field: 'playtimeHours',
    label: 'Playtime',
    suffix: 'Hours'
  },
  {
    field: 'platform',
    label: 'Platform',
  }
]

export const BOOK_ENTITY_SORT: SortLabel[] = [
  ...BASIC_ENTITY_SORT,
  {
    field: 'author',
    label: 'Author'
  },
  {
    field: 'pageCount',
    label: 'Page Count',
    suffix: 'Pages'
  },
  {
    field: 'publicationYear',
    label: 'Publication Year'
  }
]

export const TV_SHOW_ENTITY_SORT: SortLabel[] = [
  ...BASIC_ENTITY_SORT,
  {
    field: 'episodeCount',
    label: 'Episode Count',
    suffix: 'Episodes'
  },
  {
    field: 'conclusionDate',
    label: 'Conclusion Date'
  }
]

type SortLabel = {
  field: string,
  label: string,
  suffix?: string,
}

const BASIC_ENTITY_SORT: SortLabel[] = [
  {
    field: 'userRating',
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
    field: 'releaseYear',
    label: 'Release Year'
  },
  {
    field: 'userDateStarted',
    label: 'Date Started'
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
    label: 'Runtime'
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


type SortLabel = {
  field: string,
  label: string
}

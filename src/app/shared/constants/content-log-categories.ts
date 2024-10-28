export const CATEGORIES: ContentLogCategory[] = [
  {
    name: 'Movies',
    icon: 'ticket',
    route: 'movies',
    color: 'cyan'
  },
  {
    name: 'TV Shows',
    icon: 'volume-up',
    route: 'tv-shows',
    color: 'green'
  },
  {
    name: 'Video Games',
    icon: 'power-off',
    route: 'video-games',
    color: 'red'
  },
  {
    name: 'Books',
    icon: 'book',
    route: 'books',
    color: 'purple'
  }
]

type ContentLogCategory = {
  name: string,
  icon: string,
  route: string,
  color: string,
}

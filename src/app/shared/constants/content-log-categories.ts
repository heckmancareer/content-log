export const CATEGORIES: ContentLogCategory[] = [
  {
    name: 'Movies',
    icon: 'ticket',
    route: 'movies'
  },
  {
    name: 'TV Shows',
    icon: 'volume-up',
    route: 'tv-shows'
  },
  {
    name: 'Video Games',
    icon: 'power-off',
    route: 'video-games'
  },
  {
    name: 'Books',
    icon: 'book',
    route: 'books'
  }
] 

type ContentLogCategory = {
  name: string,
  icon: string,
  route: string,
}
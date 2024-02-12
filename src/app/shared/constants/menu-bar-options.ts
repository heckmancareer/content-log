import { PrimeIcons, MenuItem } from "primeng/api"

export const MENU_BAR: RouteAndMenuItemsTuple[] = [
  {
    route: 'movies',
    menuItems: [
      {
        label: 'Journal',
        icon: PrimeIcons.PENCIL,
        items: [
          {
            label: 'Grid View',
            icon: PrimeIcons.IMAGES
          },
          {
            label: 'Table View',
            icon: PrimeIcons.TABLE
          },
          {
            separator: true
          },
          {
            label: 'New Entry',
            icon: PrimeIcons.PLUS_CIRCLE,
            routerLink: '/movies/new-movie'
          }
        ]
      }
    ]
  },
  {
    route: 'tv-shows',
    menuItems: [
      {
        label: 'Journal',
        icon: PrimeIcons.PENCIL,
        items: [
          {
            label: 'Grid View',
            icon: PrimeIcons.IMAGES
          },
          {
            label: 'Table View',
            icon: PrimeIcons.TABLE
          },
          {
            separator: true
          },
          {
            label: 'New Entry',
            icon: PrimeIcons.PLUS_CIRCLE
          }
        ]
      }
    ]
  },
  {
    route: 'video-games',
    menuItems: [
      {
        label: 'Journal',
        icon: PrimeIcons.PENCIL,
        items: [
          {
            label: 'Grid View',
            icon: PrimeIcons.IMAGES
          },
          {
            label: 'Table View',
            icon: PrimeIcons.TABLE
          },
          {
            separator: true
          },
          {
            label: 'New Entry',
            icon: PrimeIcons.PLUS_CIRCLE
          }
        ]
      }
    ]
  },
  {
    route: 'books',
    menuItems: [
      {
        label: 'Journal',
        icon: PrimeIcons.PENCIL,
        items: [
          {
            label: 'Grid View',
            icon: PrimeIcons.IMAGES
          },
          {
            label: 'Table View',
            icon: PrimeIcons.TABLE
          },
          {
            separator: true
          },
          {
            label: 'New Entry',
            icon: PrimeIcons.PLUS_CIRCLE
          }
        ]
      }
    ]
  }
]

type RouteAndMenuItemsTuple = {
  route: string,
  menuItems: MenuItem[]
}

import { PrimeIcons, MenuItem } from "primeng/api"
import { NavigationService } from "../services/navigation.service"
import { EntityType } from "../models/entity-type";

export function getMenuBarConfig(navigation: NavigationService): RouteAndMenuItemsTuple[] {
  return [
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
              command: () => {
                navigation.navigateToEntityEditing(EntityType.Movie);
              }
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
              icon: PrimeIcons.PLUS_CIRCLE,
              command: () => {
                navigation.navigateToEntityEditing(EntityType.TVShow);
              }
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
              icon: PrimeIcons.PLUS_CIRCLE,
              command: () => {
                navigation.navigateToEntityEditing(EntityType.VideoGame);
              }
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
              icon: PrimeIcons.PLUS_CIRCLE,
              command: () => {
                navigation.navigateToEntityEditing(EntityType.Book);
              }
            }
          ]
        }
      ]
    }
  ]
}

type RouteAndMenuItemsTuple = {
  route: string,
  menuItems: MenuItem[]
}

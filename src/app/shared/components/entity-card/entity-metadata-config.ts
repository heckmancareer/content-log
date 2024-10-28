import { EntityType } from "../../models/entity-type";

export const ENTITY_TYPES_AND_FIELDS: EntityTypeAndFields = {
  [EntityType.Movie]: {
    fields: [
      {
        label: 'Writer',
        value: 'writer',
      },
      {
        label: 'Director',
        value: 'director',
      },
      {
        label: 'Runtime',
        value: 'runtime',
        suffix: 'Minutes'
      }
    ]
  },
  [EntityType.TVShow]: {
    fields: [
      {
        label: 'Season Number',
        value: 'seasonNumber',
      },
      {
        label: 'Episode Count',
        value: 'episodeCount',
        suffix: 'Episodes'
      },
    ]
  },
  [EntityType.Book]: {
    fields: [
      {
        label: 'Author',
        value: 'author',
      },
      {
        label: 'Page Count',
        value: 'pageCount',
        suffix: 'Pages'
      },
    ]
  },
  [EntityType.VideoGame]: {
    fields: [
      {
        label: 'Developer',
        value: 'developer'
      },
      {
        label: 'Publisher',
        value: 'publisher',
      },
      {
        label: 'Playtime Hours',
        value: 'playtimeHours',
        suffix: 'Hours'
      },
      {
        label: 'Platform',
        value: 'platform'
      }
    ]
  }
}

export interface EntityTypeAndFields {
  [key: string]: {
    fields: EntityLabelValuePair[]
  }
}

export interface EntityLabelValuePair {
  label: string,
  value: string,
  suffix?: string
}

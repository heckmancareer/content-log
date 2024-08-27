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
}

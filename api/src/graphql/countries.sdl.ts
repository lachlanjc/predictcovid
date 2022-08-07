export const schema = gql`
  type Country {
    id: Int!
    iso: String!
    worldometersSlug: String!
    name: String!
    createdAt: DateTime!
    dailyCounts: [DailyCount]!
  }

  type Query {
    countries: [Country!]!
    country(id: Int!): Country
  }

  input CreateCountryInput {
    iso: String!
    worldometersSlug: String!
    name: String!
  }

  input UpdateCountryInput {
    iso: String
    worldometersSlug: String
    name: String
  }

  type Mutation {
    createCountry(input: CreateCountryInput!): Country!
    updateCountry(id: Int!, input: UpdateCountryInput!): Country!
    deleteCountry(id: Int!): Country!
  }
`

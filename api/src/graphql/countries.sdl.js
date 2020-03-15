export const schema = gql`
  type Country {
    id: Int!
    iso: String!
    worldometersSlug: String!
    name: String!
    createdAt: DateTime!
    dailyCounts: DailyCount
  }

  type Query {
    countries: [Country]
  }

  input CountryInput {
    iso: String
    worldometersSlug: String
    name: String
    dailyCounts: Int
  }
`

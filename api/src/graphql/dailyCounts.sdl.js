export const schema = gql`
  type DailyCount {
    id: Int!
    date: Day!
    country: Country!
    totalCases: Int!
    newCases: Int!
    currentlyInfected: Int!
    totalDeaths: Int!
    newDeaths: Int!
  }

  type Query {
    dailyCounts: [DailyCount]
  }

  input DailyCountInput {
    date: Int
    country: Int
    totalCases: Int
    newCases: Int
    currentlyInfected: Int
    totalDeaths: Int
    newDeaths: Int
  }
`

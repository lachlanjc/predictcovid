export const schema = gql`
  type Day {
    id: Int!
    date: DateTime!
    createdAt: DateTime!
    counts: DailyCount
  }

  type Query {
    days: [Day]
  }

  input DayInput {
    date: DateTime
    counts: Int
  }
`

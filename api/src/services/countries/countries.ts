import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'
import { db } from 'src/lib/db'

export const countries = () => {
  return db.country.findMany()
}

export const country = ({ id }: Prisma.CountryWhereUniqueInput) => {
  return db.country.findUnique({
    where: { id }
  })
}

interface CreateCountryArgs {
  input: Prisma.CountryCreateInput
}

export const createCountry = ({ input }: CreateCountryArgs) => {
  return db.country.create({
    data: input
  })
}

interface UpdateCountryArgs extends Prisma.CountryWhereUniqueInput {
  input: Prisma.CountryUpdateInput
}

export const updateCountry = ({ id, input }: UpdateCountryArgs) => {
  return db.country.update({
    data: input,
    where: { id }
  })
}

export const deleteCountry = ({ id }: Prisma.CountryWhereUniqueInput) => {
  return db.country.delete({
    where: { id }
  })
}

export const Country = {
  dailyCounts: (_obj, { root }: ResolverArgs<Prisma.CountryWhereUniqueInput>) =>
    db.country.findUnique({ where: { id: root.id } }).dailyCounts()
}

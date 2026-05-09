import { TransactionType } from '@prisma/client'
import { prisma } from '../src/lib/prisma'

async function main() {
  const categories = [
    { slug: 'housing', name: 'Moradia', type: TransactionType.expense },
    { slug: 'utilities', name: 'Utilidades', type: TransactionType.expense },
    { slug: 'grocery', name: 'Mercado', type: TransactionType.expense },
    { slug: 'health', name: 'Saúde', type: TransactionType.expense },
    { slug: 'food', name: 'Alimentação', type: TransactionType.expense },
    { slug: 'leisure', name: 'Lazer', type: TransactionType.expense },
    { slug: 'shopping', name: 'Compras', type: TransactionType.expense },
    {
      slug: 'subscriptions',
      name: 'Assinaturas',
      type: TransactionType.expense,
    },
    { slug: 'education', name: 'Educação', type: TransactionType.expense },
    { slug: 'family', name: 'Família', type: TransactionType.expense },
    { slug: 'donations', name: 'Doações', type: TransactionType.expense },
    {
      slug: 'investments',
      name: 'Investimentos',
      type: TransactionType.expense,
    },
    { slug: 'transport', name: 'Transporte', type: TransactionType.expense },
    {
      slug: 'uncategorized',
      name: 'Sem categoria',
      type: TransactionType.expense,
    },
    { slug: 'salary', name: 'Salário', type: TransactionType.income },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {},
      create: category,
    })
  }
}

main()
  .then(() => {
    console.log('Seed executada')
  })
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })

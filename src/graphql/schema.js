export const typeDefs = `
  type Category {
    id: ID!
    name: String!
    description: String
    items: [Item!]
  }

  type Item {
    id: ID!
    name: String!
    description: String
    brand: String
    model: String
    year: Int
    pricePerDay: Float
    availability: String
    category: Category!
  }

  type Query {
    categories: [Category!]
    category(id: ID!): Category
    items: [Item!]
    item(id: ID!): Item
  }

  input CategoryInput {
    name: String!
    description: String
  }

  input ItemInput {
    name: String!
    description: String
    brand: String
    model: String
    year: Int
    pricePerDay: Float
    availability: String
    categoryId: Int!
  }

  type Mutation {
    createCategory(data: CategoryInput!): Category!
    updateCategory(id: ID!, data: CategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!

    createItem(data: ItemInput!): Item!
    updateItem(id: ID!, data: ItemInput!): Item!
    deleteItem(id: ID!): Boolean!
  }
`;

import gql from "graphql-tag";

export const loginMutation = gql`
mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    firstName
    lastName
    email
    name
  }
}
`;
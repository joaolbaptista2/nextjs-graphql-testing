import gql from "graphql-tag";

export const changePasswordMutation = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      id,
      name,
      lastName,
      email
    }
}
`;
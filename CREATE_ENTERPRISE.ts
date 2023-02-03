import { gql } from '@apollo/client';

export const CREATE_ENTERPRISE = gql`
  mutation createEnterpriseClient {
    createEnterpriseClient {
      supplierActions {
        actions {
          actionUid
          label
          type
        }
      }
      uid
      name
    }
  }
`;

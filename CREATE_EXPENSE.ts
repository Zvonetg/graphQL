import { gql } from '@apollo/client';

export const CREATE_EXPENSE = gql`
  mutation createExpense($expenseModel: CreateExpenseModelInput, $attachments: CreateExpenseMediaModelInput) {
    createExpense(expenseModel: $expenseModel, attachments: $attachments) {
      uid
      engagementUid
    }
  }
`;

export const SUBMIT_EXPENSE = gql`  
  mutation submitExpense($engagementUid: String!, $expenseUid: String!) {
    submitExpense(engagementUid: $engagementUid, expenseUid: $expenseUid) {
      uid
      status
    }
  }
`;

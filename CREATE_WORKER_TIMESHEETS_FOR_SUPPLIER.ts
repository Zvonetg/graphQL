import { gql } from '@apollo/client';

export const CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER = gql`
  mutation dev_createWorkerTimesheetsForSupplier {
    dev_createWorkerTimesheetsForSupplier {
      timesheets {
        uid
        number
        semanticVersion
        status
        workerProfileModel {
          name {
            fullName
          }
        }
        startDate
        endDate
        totalAmount
        enterprise {
          uid
        }
      }
    }
  }
`;

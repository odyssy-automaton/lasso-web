import { object, number, string } from "yup";

import DaoInformation from "./DaoInformation";
import CurrencyInfo from "./CurrencyInfo";
import TimingInfo from "./TimingInfo";
import DepositInfo from "./DepositInfo";
import SummonSummary from "./SummonSummary";
import { tokenToAddress } from "../../util/constants";

export default [
  {
    id: "dao",
    component: DaoInformation,
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: object().shape({
      name: string().required(),
      description: string().required()
    })
  },
  {
    id: "currency",
    component: CurrencyInfo,
    initialValues: {
      approvedToken: tokenToAddress.Dai,
      minimumTribute: ""
    },
    validationSchema: object().shape({
      approvedToken: string().required(),
      minimumTribute: number().required()
    }),
    actionLabel: "Proceed"
  },
  {
    id: "timing",
    component: TimingInfo,
    initialValues: {
      periodDuration: 17280,
      votingPeriodLength: "5", // default to 1 day
      gracePeriodLength: "5",
      abortWindow: "5"
    },
    validationSchema: object().shape({
      periodDuration: number().required(),
      votingPeriodLength: number().required(),
      gracePeriodLength: number().required(),
      abortWindow: number().required()
    }),
    actionLabel: "Proceed"
  },
  {
    id: "deposit",
    component: DepositInfo,
    initialValues: {
      proposalDeposit: "",
      dilutionBound: 3,
      processingReward: ""
    },
    validationSchema: object().shape({
      proposalDeposit: number().required(),
      dilutionBound: number().required(),
      processingReward: number().required()
    }),
    actionLabel: "Proceed"
  },
  {
    id: "summary",
    component: SummonSummary
  }
];

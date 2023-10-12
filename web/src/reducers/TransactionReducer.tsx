type TransactionType = "approval" | "supply" | "withdraw" | "borrow" | "repay" | "delegate" | undefined;

type TransactionUninitiated = {
	transactionType: undefined;
	error: undefined;
	approvalSuccess: boolean;
	txHash: undefined;
	status: "uninitiated";
};

type TransactionInProgress = {
	transactionType: TransactionType;
	error: undefined;
	approvalSuccess: boolean;
	txHash: undefined;
	status: "inProgress";
};

type TransactionSuccess = {
	transactionType: TransactionType;
	error: undefined;
	approvalSuccess: boolean;
	txHash: string;
	status: "success";
};

type TransactionFinalSuccess = {
	transactionType: TransactionType;
	error: undefined;
	approvalSuccess: boolean;
	txHash: string;
	status: "finalSuccess";
};

type TransactionFailed = {
	transactionType: TransactionType;
	error: string;
	approvalSuccess: boolean;
	txHash: undefined;
	status: "failed";
};

type TransactionPermissionRejected = {
	transactionType: TransactionType;
	error: string;
	approvalSuccess: boolean;
	txHash: undefined;
	status: "permissionRejected";
};

export type TransactionState = 
	| TransactionUninitiated
	| TransactionInProgress
	| TransactionSuccess
	| TransactionFinalSuccess
	| TransactionFailed
	| TransactionPermissionRejected;

export const initialTransactionState: TransactionState = {
	transactionType: undefined,
	error: undefined,
	approvalSuccess: false,
	txHash: undefined,
	status: "uninitiated",
};

type Uninitiated = {
	type: "uninitiated";
};

type InProgress = {
	type: "inProgress";
	payload: {
		transactionType: TransactionType;
	}
};

type Success = {
	type: "success";
	payload: {
		transactionType: TransactionType;
		txHash: string;
	}
};

type ApprovalSuccess = {
	type: "approvalSuccess";
	payload: {
		txHash: string;
	}
};

type Failed = {
	type: "failed";
	payload: {
		transactionType: TransactionType;
		error: string;
	}
};

type PermissionRejected = {
	type: "permissionRejected";
	payload: {
		error: string;
	}
};

type FinalSuccess = {
	type: "finalSuccess";
	payload: {
		transactionType: TransactionType;
		txHash: string;
	}
};

export type ACTION_TYPE = 
	| Uninitiated
	| InProgress
	| Success
	| ApprovalSuccess
	| Failed
	| PermissionRejected
	| FinalSuccess;


export function TransactionReducer(state: TransactionState, action: ACTION_TYPE): TransactionState {
	switch (action.type) {
		case "uninitiated":
			return initialTransactionState;
		case "inProgress":
			return {
				...state,
				transactionType: action.payload.transactionType,
				error: undefined,
				txHash: undefined,
				status: "inProgress"
			};
		case "success":
			return {
				...state,
				transactionType: action.payload.transactionType,
				txHash: action.payload.txHash,
				error: undefined,
				status: "success"
			};
		case "approvalSuccess":
			return {
				transactionType: "approval",
				error: undefined,
				approvalSuccess: true,
				txHash: action.payload.txHash,
				status: "success"
			};
		case "failed":
			return {
				...state,
				transactionType: action.payload.transactionType,
				error: action.payload.error,
				txHash: undefined,
				status: "failed"
			};
		case "permissionRejected":
			return {
				...state,
				error: action.payload.error,
				txHash: undefined,
				status: "failed"
			};
		case "finalSuccess":
			return {
				transactionType: action.payload.transactionType,
				error: undefined,
				approvalSuccess: false,
				txHash: action.payload.txHash,
				status: "finalSuccess",
			};
		default:
			throw new Error();
	} 
}
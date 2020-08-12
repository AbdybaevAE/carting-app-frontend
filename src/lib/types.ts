export type TUserData = {
  _id: string;
  username: string;
  updatedAt: Date;
  active: boolean;
  time: number;
  top: number;
};
export type TUser = {
  id: string;
  top: number;
  username: string;
  date: Date;
  isActive: boolean;
  result: number;
};

export type TMetaData = {
  totalCount: number;
  perPage: number;
  span: {
    start: number;
    end: number;
  };
};
export type TError = {
  name: string;
  message: string;
};

export type TSocketResponse<T> = {
  isSuccess: boolean;
  data: T;
  error: TError;
  meta: TMetaData;
};
type TSocketCallback<T> = (data: TSocketResponse<T>) => void;
export type TSocketJoinCallback = TSocketCallback<string>;
export type TScoketPageUpdateCallback = TSocketCallback<string>;
export type TSocketTotalCountCallback = TSocketCallback<number>;

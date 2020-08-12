import {
  subscribeToPage,
  // initiateSocket,
  // switchPage,
  subscribeToJoinEvent,
  subscribeToPageUpdateEvent,
  unsubscribeFromJoinEvent,
  subscribeToTotalCountEvent,
  unsubscribeTotalCountEvent,
} from "../lib/socket";
import { TUser, TMetaData, TError } from "../lib/types";
import { transformJoinEventDto } from "../lib/util";
type TSuccessCallback<T> = (data: T, meta: TMetaData) => void;
type TErrorCallback = (e: TError) => void;

export class SocketService {
  static subscribeToPage(page: number) {
    subscribeToPage(page);
  }
  static subscribeToJoinEvent(
    success: TSuccessCallback<TUser[]>,
    error: TErrorCallback
  ) {
    subscribeToJoinEvent((message) => {
      if (!message.isSuccess) return error(message.error);
      const users = transformJoinEventDto(message);
      success(users, message.meta);
    });
  }
  static subscribeToTotalCountEvent(
    success: (count: number) => void,
    error: TErrorCallback
  ) {
    subscribeToTotalCountEvent((message) => {
      if (!message.isSuccess) return error(message.error);
      success(message.data);
    });
  }
  static unsubscribeToJoinEvent() {
    unsubscribeFromJoinEvent();
  }
  static unsubscribeTotalCountEvent() {
    unsubscribeTotalCountEvent();
  }
  static subscribeToPageUpdateEvent(
    success: TSuccessCallback<TUser[]>,
    error: TErrorCallback
  ) {
    subscribeToPageUpdateEvent((message) => {
      if (!message.isSuccess) return error(message.error);
      const users = transformJoinEventDto(message);
      success(users, message.meta);
    });
  }
  // static subscribeToPageCountEvent(
  //   success: TSuccessCallback<
  // )
  //   static newSubscr(success: )
}

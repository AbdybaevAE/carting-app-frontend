import io from "socket.io-client";
import {
  TSocketJoinCallback,
  TScoketPageUpdateCallback,
  TSocketTotalCountCallback,
} from "./types";
const GATEWAY_API = process.env.API as string;
let socket;

let callbacks: TSocketJoinCallback[] = [];
let pageUpdatesCallback: TScoketPageUpdateCallback[] = [];
let totalCountCallbacks: TSocketTotalCountCallback[] = [];
export const initiateSocket = () => {
  console.log("initiate socket...");
  socket = io(GATEWAY_API);
  socket.on("joinResponse", (data) => {
    callbacks.forEach((callback) => callback(data));
  });
  socket.on("update-list", (message) => {
    pageUpdatesCallback.forEach((callback) => callback(message));
  });
  socket.on("total-count", (message) => {
    totalCountCallbacks.forEach((callback) => callback(message));
  });
};
initiateSocket();
export const subscribeToPage = (page: number) => {
  if (!socket) return;
  socket.emit("setPage", {
    data: page,
  });
};
export const disconnectSocket = () => {
  console.info("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToPageUpdateEvent = (
  callback: TScoketPageUpdateCallback
) => {
  if (!socket) return;
  pageUpdatesCallback.push(callback);
};
export const subscribeToJoinEvent = (callback: TSocketJoinCallback) => {
  if (!socket) return;
  callbacks.push(callback);
};
export const subscribeToTotalCountEvent = (
  callback: TSocketTotalCountCallback
) => {
  if (!socket) return;
  totalCountCallbacks.push(callback);
};
export const unsubscribeFromJoinEvent = () => {
  callbacks = [];
};

export const unsubscribeTotalCountEvent = () => {
  totalCountCallbacks = [];
};

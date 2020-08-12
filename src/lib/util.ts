import { TUser, TUserData, TSocketResponse } from "./types";

export const EmptyUser = (): TUser => ({
  username: "",
  id: "",
  result: 0,
  isActive: false,
  date: new Date(),
  top: 0,
});
export const transformUserDto = (userData: TUserData, top: number): TUser => ({
  id: userData._id,
  top,
  username: userData.username,
  date: userData.updatedAt,
  isActive: userData.active,
  result: userData.time,
});

export const transformJoinEventDto = (
  message: TSocketResponse<string>
): TUser[] => {
  try {
    const users = JSON.parse(message.data) as TUserData[];
    const {
      span: { start },
    } = message.meta;
    return users
      .sort((userA, userB) => userA.time - userB.time)
      .map((user, index) => transformUserDto(user, start + index + 1));
  } catch (e) {
    console.error("error while parsing", e);
    return [];
  }
};

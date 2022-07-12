export async function verifyToken(token): Promise<string> {
  try {
    let payload: any = jwt.verify(token, constants.ACCESS_TOKEN_SECRET);
    // console.log(payload)
    if (!payload) {
      throw { status: 403, message: "Invalid token", error_code: constants.ERROR_CODE_INVALID_VALUE };
    }

    if (!payload.user) {
      throw { status: 403, message: "Invalid token", error_code: constants.ERROR_CODE_INVALID_VALUE };
    }

    return payload.user;
  } catch (err) {
    throw err;
  }
}

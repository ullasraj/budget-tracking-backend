export const errorResponse = (error: string) => {

    return ({ status: "Error", error: { message: error } })
}

export const successResponse = (data?: any) => (
  data !== undefined
    ? { status: "Ok", data: { data } }
    : { status: "Ok" }
);

export const isErrorResponse=(
  res: any
): res is { status: "Error"; error: { message: string } } =>{
  return res?.status === "Error";
}

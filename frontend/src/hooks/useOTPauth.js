import { useMutation } from "@tanstack/react-query";
import { sendOtp, verifyOtp } from "../lib/api";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
    onSuccess: (_, email, context) => {
      if (context?.onSuccess) context.onSuccess();
    },
    onError: (error, email, context) => {
      if (context?.onError) context.onError(error);
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (_, variables, context) => {
      if (context?.onSuccess) context.onSuccess();
    },
    onError: (error, variables, context) => {
      if (context?.onError) context.onError(error);
    },
  });
};

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormHelperText,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SupportingTxt, { SupportingTxtProps } from "@/components/supportingTxt";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "./authLayout";

const validationErrors = {
  username: {
    required: "Username is required.",
    invalid: "Username can only include letters, numbers, and underscores.",
    length: "Username must be at least 3 characters long.",
    forbiddenExample:
      "johndoe123' is not allowed. Choose a different username.",
  },
  email: {
    required: "Email is required.",
    invalid: "Please enter a valid email address.",
    forbiddenExample:
      "johndoe@example.com' is not allowed. Choose a different email.",
  },
  password: {
    required: "Password is required.",
    length: "Password must be at least 8 characters long.",
    strength:
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  },
  confirmPassword: {
    required: "Confirming your password is required.",
    mismatch: "Passwords do not match.",
  },
};

const formSchema = z
  .object({
    username: z
      .string()
      .min(1, validationErrors.username.required)
      .min(3, validationErrors.username.length)
      .regex(/^\w+$/, validationErrors.username.invalid)
      .refine((username) => username !== "johndoe123", {
        message: validationErrors.username.forbiddenExample,
      }),
    email: z
      .string()
      .email(validationErrors.email.invalid)
      .min(1, validationErrors.email.required)
      .refine((email) => email !== "johndoe@example.com", {
        message: validationErrors.email.forbiddenExample,
      }),
    password: z
      .string()
      .min(8, validationErrors.password.length)
      .refine(
        (val) =>
          /[A-Z]/.test(val) &&
          /[a-z]/.test(val) &&
          /\d/.test(val) &&
          /[^a-zA-Z0-9]/.test(val),
        validationErrors.password.strength
      ),
    confirmPassword: z
      .string()
      .min(1, validationErrors.confirmPassword.required),
    location: z.string().min(0).optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: validationErrors.confirmPassword.mismatch,
        path: ["confirmPassword"],
      });
    }
  });

type FieldName = keyof z.infer<typeof formSchema>;

const baseHelperText = {
  username:
    "Choose a unique username with at least 3 characters (e.g., johndoe123).",
  email: "Enter a valid email address (e.g., johndoe@example.com).",
  password:
    "At least 8 characters, including uppercase, lowercase, numbers, and a special character.",
  location: "Location must be a real city or country (e.g., Paris, France).",
};

const formFields: {
  name: FieldName;
  label: string;
  placeholder: string;
  helperText: string | null;
  required: boolean;
  helperVisible?: boolean;
}[] = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    helperText: baseHelperText.username,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    helperText: baseHelperText.email,
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Create a strong password",
    helperText: baseHelperText.password,
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
    helperText: null, // No redundant text
    required: true,
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Enter your city or location. ",
    helperText: baseHelperText.location,
    helperVisible: true,
    required: true,
  },
];

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
    },
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
    username,
    email,
  }) => {
    const checkTaken = async (
      value: string,
      existItems: string[]
    ): Promise<boolean> => {
      return !existItems.includes(value);
    };

    const [usernameTaken, emailTaken] = await Promise.all([
      checkTaken(username, ["johndoe", "janedoe"]),
      checkTaken(email, ["johndoe@example.com", "janedoe@example.com"]),
    ]);

    const errors: Record<string, string> = {};

    if (Object.entries(errors).length > 0) {
      if (usernameTaken) errors.username = "This username is already taken";
      if (emailTaken) errors.email = "This email is already taken";

      for (const [field, message] of Object.entries(errors)) {
        form.setError(
          field as FieldName,
          { type: "server", message },
          { shouldFocus: true }
        );
      }
      changeSupportingTxt({ intent: "error", children: "Sign Up Failed!" });
    }
    await Promise.resolve(setTimeout(() => {}, 500));
    changeSupportingTxt(initSupportingTxt);
  };

  const [focusedField, setFocusedField] = useState<FieldName | null>(null);

  const initSupportingTxt: SupportingTxtProps = {
    intent: "default",
    children: "Get your free loneForum.co account now",
  };
  const [supportingTxt, changeSupportingTxt] = useState(initSupportingTxt);

  return (
    <AuthLayout
      title="Register Account"
      supportingTxt={
        <SupportingTxt intent={supportingTxt.intent}>
          {supportingTxt.children}
        </SupportingTxt>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formFields.map(({ name, label, placeholder, helperText }) => {
            return (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({
                  field,
                  fieldState: {
                    error,
                    // invalid,
                    // isDirty,
                    //isTouched,
                    isValidating,
                  },
                }) => {
                  return (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type={
                            name === "password" || name === "confirmPassword"
                              ? "password"
                              : "text"
                          }
                          autoComplete="off"
                          placeholder={placeholder}
                          invalid={Boolean(error)}
                          aria-invalid={Boolean(error)}
                          disabled={isValidating}
                          {...field}
                          onFocus={() => {
                            setFocusedField(name);
                          }}
                          onBlur={() => {
                            field.onBlur();
                            setFocusedField(null);
                          }}
                        />
                      </FormControl>
                      {focusedField === name && helperText && !error && (
                        <FormHelperText>{helperText}</FormHelperText>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}

          <Button type="submit" width="full">
            Sign Up
          </Button>
        </form>
      </Form>

      <SupportingTxt className="mt-5 text-center">
        Already have an account ?
        <Link to="/signin" className={buttonVariants({ variant: "cta" })}>
          Sign in
        </Link>
      </SupportingTxt>
    </AuthLayout>
  );
}

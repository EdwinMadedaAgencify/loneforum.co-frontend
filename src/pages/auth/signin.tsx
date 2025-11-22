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
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "./authLayout";

const validationErrors = {
  usernameOrEmail: {
    required: "This field is required.",
    invalid: "Enter a valid username or email address.",
    maxLength: "The username or email must not exceed 50 characters.",
  },
  password: {
    required: "This field is required.",
    maxLength: "The password must not exceed 100 characters.",
  },
};

const formSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, validationErrors.usernameOrEmail.required)
    .max(50, validationErrors.usernameOrEmail.maxLength)
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_]+$/.test(val),
      { message: validationErrors.usernameOrEmail.invalid }
    ),
  password: z
    .string()
    .min(1, validationErrors.password.required)
    .max(100, validationErrors.password.maxLength),
  rememberMe: z.boolean().default(false).optional(),
});

type FieldName = Exclude<keyof z.infer<typeof formSchema>, "rememberMe">;

const formFields: {
  name: FieldName;
  label: string;
  placeholder: string;
  helperText?: string | null;

  helperVisible?: boolean;
}[] = [
  {
    name: "usernameOrEmail",
    label: "Username or Email",
    placeholder: "Enter username or email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
];

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
    shouldFocusError: true,
  });

  const [focusedField, setFocusedField] = React.useState<FieldName | null>(
    null
  );

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
    usernameOrEmail,
  }) => {
    const checkAvailable = async (
      value: string,
      existItems: string[]
    ): Promise<boolean> => {
      return !existItems.includes(value);
    };

    const [usernameAvailable, emailAvailable] = await Promise.all([
      checkAvailable(usernameOrEmail, ["johndoe", "janedoe"]),
      checkAvailable(usernameOrEmail, [
        "johndoe@example.com",
        "janedoe@example.com",
      ]),
    ]);

    const errors: Record<string, string> = {};

    if (!usernameAvailable || !emailAvailable)
      errors.usernameOrEmail = "Invalid credentials!";

    for (const [field, message] of Object.entries(errors)) {
      form.setError(
        field as FieldName,
        { type: "server", message },
        { shouldFocus: true }
      );
      changeSupportingTxt({ intent: "error", children: "Sign In Failed!" });
    }
    await Promise.resolve(setTimeout(() => {}, 500));
    changeSupportingTxt(initSupportingTxt);
  };

  const initSupportingTxt: SupportingTxtProps = {
    intent: "default",
    children: "Sign in to continue to loneForum.co",
  };
  const [supportingTxt, changeSupportingTxt] = useState(initSupportingTxt);

  return (
    <AuthLayout
      title="Welcome Back !"
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
                render={({ field, fieldState: { error } }) => {
                  return (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type={name === "password" ? "password" : "text"}
                          autoComplete="off"
                          placeholder={placeholder}
                          invalid={Boolean(error)}
                          aria-invalid={Boolean(error)}
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
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0  px-4">
                <FormControl>
                  <Checkbox
                    className=""
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                  <FormHelperText>
                    Keep me logged in on this device for easier access.
                  </FormHelperText>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" width="full">
            Sign In
          </Button>
        </form>
      </Form>

      <SupportingTxt className="mt-5 text-center">
        Don&apos;t have an account?
        <Link to="/signup" className={buttonVariants({ variant: "cta" })}>
          Sign up
        </Link>
      </SupportingTxt>
    </AuthLayout>
  );
}

"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect } from "react";

export default function UserForm({
  onSubmit,
  initialData = {},
  isLoading = false,
  error = "",
  mode = "create", // 'create' or 'edit'
}) {
  console.log("UserForm render with mode:", mode);
  console.log("Initial Data received:", initialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues:
      mode === "edit"
        ? {
            name: initialData?.name || "",
            email: initialData?.email || "",
            role: initialData?.role || "user",
          }
        : {
            name: "",
            email: "",
            role: "user",
          },
  });

  // For debug - see current form values
  const currentValues = watch();
  console.log("Current form values:", currentValues);

  // Reset form when initialData changes in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      console.log("Resetting form with data:", initialData);
      reset({
        name: initialData.name || "",
        email: initialData.email || "",
        role: initialData.role || "user",
      });
    }
  }, [initialData, mode, reset]);

  const roles = ["user", "admin", "editor", "moderator"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          className={`input input-bordered ${errors.name ? "input-error" : ""}`}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        {errors.name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.name.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          className={`input input-bordered ${
            errors.email ? "input-error" : ""
          }`}
          disabled={mode === "edit"}
          {...register("email", {
            required: mode === "create" ? "Email is required" : false,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {mode === "edit" && (
          <label className="label">
            <span className="label-text-alt text-gray-500">
              Email cannot be modified
            </span>
          </label>
        )}
        {errors.email && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.email.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Role</span>
        </label>
        <select
          className={`select select-bordered ${
            errors.role ? "select-error" : ""
          }`}
          {...register("role", { required: "Role is required" })}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
        {errors.role && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.role.message}
            </span>
          </label>
        )}
      </div>

      <div className="flex gap-4 justify-end">
        <Link href="/admin/dashboard/users" className="btn btn-ghost">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              {mode === "create" ? "Creating..." : "Saving..."}
            </>
          ) : mode === "create" ? (
            "Create User"
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}

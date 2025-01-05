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

  // Para debug - ver valores actuales del form
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
          <span className="label-text">Nombre</span>
        </label>
        <input
          type="text"
          className={`input input-bordered ${errors.name ? "input-error" : ""}`}
          {...register("name", {
            required: "El nombre es requerido",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres",
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
          <span className="label-text">Correo Electrónico</span>
        </label>
        <input
          type="email"
          className={`input input-bordered ${
            errors.email ? "input-error" : ""
          }`}
          disabled={mode === "edit"}
          {...register("email", {
            required: mode === "create" ? "El correo es requerido" : false,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico inválido",
            },
          })}
        />
        {mode === "edit" && (
          <label className="label">
            <span className="label-text-alt text-gray-500">
              El correo electrónico no se puede modificar
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
          <span className="label-text">Rol</span>
        </label>
        <select
          className={`select select-bordered ${
            errors.role ? "select-error" : ""
          }`}
          {...register("role", { required: "El rol es requerido" })}
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
          Cancelar
        </Link>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              {mode === "create" ? "Creando..." : "Guardando..."}
            </>
          ) : mode === "create" ? (
            "Crear Usuario"
          ) : (
            "Guardar Cambios"
          )}
        </button>
      </div>
    </form>
  );
}

"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function DebugPage() {
	const { data: session } = useSession();
	const [businessId, setBusinessId] = useState("");
	const [description, setDescription] = useState("");
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch("/api/debug-save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					businessId,
					description,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Error al guardar la descripción");
			}

			setResult(data);
			toast.success("Descripción guardada correctamente");
		} catch (error) {
			console.error("Error:", error);
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	if (!session) {
		return <div>Por favor inicia sesión para acceder a esta página.</div>;
	}

	return (
		<div className="min-h-screen p-8 bg-gradient-to-br from-yellow-50 to-white">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="card bg-white shadow-md border border-yellow-100">
					<div className="card-body">
						<h1 className="text-3xl font-bold text-amber-600">
							Depuración de descripción
						</h1>
						<p className="text-gray-600">
							Usa este formulario para guardar manualmente la descripción de un
							negocio.
						</p>
					</div>
				</div>

				<div className="card bg-white shadow-xl border border-yellow-100">
					<div className="card-body">
						<h2 className="card-title text-amber-600 mb-4">
							Guardar descripción
						</h2>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="form-control">
								<label className="label">
									<span className="label-text text-gray-700">
										ID del negocio
									</span>
								</label>
								<input
									type="text"
									value={businessId}
									onChange={(e) => setBusinessId(e.target.value)}
									className="input input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
									placeholder="Ej: 67f8b1335526075ab94a6c05"
									required
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text text-gray-700">Descripción</span>
								</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="textarea textarea-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 h-24"
									placeholder="Descripción del negocio"
								/>
							</div>

							<div className="flex justify-end">
								<button
									type="submit"
									className="btn bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0 hover:shadow-md"
									disabled={isLoading}>
									{isLoading ? (
										<>
											<span className="loading loading-spinner loading-sm"></span>
											Guardando...
										</>
									) : (
										"Guardar descripción"
									)}
								</button>
							</div>
						</form>

						{result && (
							<div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
								<h3 className="font-medium text-gray-700 mb-2">Resultado:</h3>
								<pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
									{JSON.stringify(result, null, 2)}
								</pre>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

function Select({
	label,
	options,
	error,
	register,
	registerOptions,
	...props
}) {
	return (
		<div className="w-full">
			<label className="block text-black text-base font-light mb-2">
				{label}
			</label>
			<select
				className="w-full bg-white border-2 border-black text-black px-4 py-3 text-base font-light focus:outline-none focus:border-[#191919] transition-colors appearance-none cursor-pointer"
				{...register(props.name, registerOptions)}
				{...props}>
				<option value="" className="text-gray-500">
					{props.placeholder || "Selecciona una opción"}
				</option>
				{options.map((option, index) => (
					<option
						key={index}
						value={option.value || option}
						className="text-black">
						{option.label || option}
					</option>
				))}
			</select>
			{error && (
				<p className="text-[#191919] text-sm font-medium mt-2 bg-white/80 px-2 py-1 inline-block">
					{error.message}
				</p>
			)}
		</div>
	);
}

export default Select;

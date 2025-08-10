"use client";

function TextArea({ label, error, register, registerOptions, ...props }) {
	return (
		<div className="w-full">
			<label className="block text-black text-base font-light mb-2">
				{label}
			</label>
			<textarea
				className="w-full bg-white border-2 border-black text-black px-4 py-3 text-base font-light focus:outline-none focus:border-[#191919] transition-colors placeholder-gray-500 h-32 resize-none"
				{...register(props.name, registerOptions)}
				{...props}
			/>
			{error && (
				<p className="text-[#191919] text-sm font-medium mt-2 bg-white/80 px-2 py-1 inline-block">
					{error.message}
				</p>
			)}
		</div>
	);
}

export default TextArea;

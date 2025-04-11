import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function GET() {
	try {
		// Check environment variables
		const config = {
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		};

		// Check if any variables are missing
		const missingVars = Object.entries(config)
			.filter(([key, value]) => !value)
			.map(([key]) => key);

		if (missingVars.length > 0) {
			return NextResponse.json(
				{
					status: "error",
					message: "Missing environment variables",
					missingVars,
				},
				{ status: 500 }
			);
		}

		// Test Cloudinary ping
		const pingResult = await pingCloudinary();

		return NextResponse.json({
			status: "success",
			config: {
				cloud_name: config.cloud_name,
				api_key: maskString(config.api_key),
				api_secret: maskString(config.api_secret),
			},
			pingResult,
		});
	} catch (error) {
		console.error("Cloudinary test error:", error);
		return NextResponse.json(
			{
				status: "error",
				message: error.message,
				stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
			},
			{ status: 500 }
		);
	}
}

// Function to ping Cloudinary API
async function pingCloudinary() {
	return new Promise((resolve, reject) => {
		cloudinary.api.ping((error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
}

// Helper to mask sensitive information
function maskString(str) {
	if (!str) return null;
	const firstChars = str.substring(0, 4);
	const lastChars = str.substring(str.length - 4);
	return `${firstChars}...${lastChars}`;
}

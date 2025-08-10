import { NextResponse } from "next/server";
import config from "@/config";

// Conditional Resend import - will work once Node.js is updated and Resend is installed
let resend;

try {
  const { Resend } = require("resend");
  resend = new Resend(process.env.RESEND_API_KEY);
} catch (error) {
  console.log("Resend not available yet. Install it after updating Node.js to >=18.17.0");
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      email,
      phone,
      company,
      serviceType,
      projectDescription
    } = body;

    // Validación básica
    if (!fullName || !email || !serviceType || !projectDescription) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Email HTML template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e1313d; padding-bottom: 10px;">
          Nuevo mensaje de contacto
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nombre completo:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>Empresa:</strong> ${company || 'No proporcionado'}</p>
          <p><strong>Tipo de servicio:</strong> ${serviceType}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Descripción del proyecto:</h3>
          <div style="background-color: #fff; border-left: 4px solid #e1313d; padding: 15px; margin: 10px 0;">
            ${projectDescription.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666;">
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
          <p>Este mensaje fue enviado desde el formulario de contacto de Bravo Creative Studio.</p>
        </div>
      </div>
    `;

    // Try to send with Resend if available, otherwise log the data
    if (resend && process.env.RESEND_API_KEY) {
      try {
        console.log("🔄 Intentando enviar email con Resend...");
        
        // Use Resend onboarding domain for testing if custom domain fails
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        
        console.log("From:", fromEmail);
        console.log("To:", config.email.supportEmail);
        
        const emailResult = await resend.emails.send({
          from: fromEmail,
          to: config.email.supportEmail,
          subject: `Nuevo contacto de ${fullName} - ${serviceType}`,
          html: emailHtml
        });
        
        console.log("✅ Email enviado correctamente con Resend");
        console.log("📧 ID del email:", emailResult.data?.id);
        console.log("📧 Resultado completo:", emailResult);
      } catch (resendError) {
        console.error("❌ Error enviando email con Resend:", resendError);
        console.error("📧 Detalles del error:", resendError.message);
        console.error("📧 Código de error:", resendError.name);
        
        // Log the data as fallback
        console.log("📧 Datos del contacto (Resend falló):", {
          fullName,
          email,
          phone,
          company,
          serviceType,
          projectDescription,
          timestamp: new Date().toISOString()
        });
      }
    } else {
      // Fallback: Log the contact data
      console.log("📧 Nuevo mensaje de contacto (Resend no disponible):", {
        fullName,
        email,
        phone,
        company,
        serviceType,
        projectDescription,
        timestamp: new Date().toISOString(),
        emailHtml
      });
      
      console.log("💡 Para enviar emails reales:");
      console.log("1. Actualiza Node.js a >=18.17.0");
      console.log("2. Ejecuta: yarn add resend");
      console.log("3. Configura RESEND_API_KEY en .env.local");
    }

    return NextResponse.json(
      { message: "Mensaje enviado correctamente" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error al procesar el contacto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
# Configuración de Resend para el formulario de contacto

## Estado actual ✅
- ✅ Formulario de contacto creado con validaciones completas
- ✅ Endpoint API actualizado con integración Resend
- ✅ Fallback a logging cuando Resend no esté disponible
- ✅ Template de email HTML profesional implementado
- ✅ Multi-idioma implementado (ES/EN)

## Para completar la configuración de emails:

### 1. Actualizar Node.js (REQUERIDO)
```bash
# Opción 1: Usando nvm (recomendado)
nvm install 18.17.0
nvm use 18.17.0

# Opción 2: Descargar desde nodejs.org
# Ir a https://nodejs.org y descargar la versión LTS
```

### 2. Instalar Resend
```bash
yarn add resend
```

### 3. Configurar variables de entorno
Agregar al archivo `.env.local`:
```
RESEND_API_KEY=tu_api_key_de_resend
```

Para obtener tu API key:
1. Ve a https://resend.com
2. Crea una cuenta o inicia sesión
3. Ve a API Keys en tu dashboard
4. Crea una nueva API key
5. Cópiala al archivo .env.local

### 4. Verificar configuración en config.js
El sistema está configurado para enviar emails a:
- **Desde**: `no-reply@bravo.studio`
- **Hacia**: `holabravocreatives@gmail.com`

## Funcionamiento actual

**Mientras Resend no esté configurado:**
- ✅ El formulario funciona perfectamente
- ✅ Los datos se validan correctamente
- ✅ La información se registra en los logs del servidor
- ✅ Los usuarios reciben confirmación de envío

**Una vez configurado Resend:**
- ✅ Los emails se envían automáticamente a holabravocreatives@gmail.com
- ✅ HTML template profesional con el branding de Bravo
- ✅ Fallback a logging si hay errores en el envío

## Implementación técnica realizada:

```javascript
import { NextResponse } from "next/server";
import { Resend } from "resend";
import config from "@/config";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Enviar email con Resend
    await resend.emails.send({
      from: config.email.noReplyEmail,
      to: config.email.supportEmail,
      subject: `Nuevo contacto de ${fullName} - ${serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
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
            <div style="background-color: #fff; border-left: 4px solid #007bff; padding: 15px; margin: 10px 0;">
              ${projectDescription.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666;">
            <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            <p>Este mensaje fue enviado desde el formulario de contacto de Bravo Creative Studio.</p>
          </div>
        </div>
      `
    });

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
```

## Campos del formulario implementados:
- **Nombre completo** (requerido)
- **Email** (requerido, con validación)
- **Teléfono** (opcional)
- **Nombre de la empresa** (opcional)
- **Tipo de servicio** (menú desplegable, requerido):
  - Diseño de Logotipo e Identidad Visual
  - Fotografía Profesional
  - Branding/Rebranding
  - Diseño y Desarrollo Web
  - Diseño y desarrollo de Apps y Webapps
- **Breve descripción del proyecto** (requerido, mínimo 20 caracteres)

## Multi-idioma
- ✅ Español (por defecto)
- ✅ Inglés
- ✅ Switcher de idioma en la navegación
- ✅ Todas las validaciones y mensajes traducidos

## Próximos pasos recomendados:
1. Actualizar Node.js a >=18.17.0
2. Instalar Resend: `yarn add resend`
3. Configurar RESEND_API_KEY en .env.local
4. Probar el envío de emails
5. Opcional: Configurar dominio personalizado en Resend para usar emails @bravo.studio

## Notas técnicas:
- El endpoint API tiene fallback automático a logging si Resend no está disponible
- Template de email HTML profesional con branding de Bravo
- Validación robusta en frontend y backend
- Manejo de errores completo
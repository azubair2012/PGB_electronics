# Email Integration Guide
## PGB Electrónica Industrial Contact Form

### Overview
This document provides a comprehensive guide for implementing email functionality for the contact form on the PGB Electrónica Industrial website. The form will send inquiries directly to `pgbpowerelectronics@gmail.com`.

---

## Email Integration Options Analysis

### Option 1: PHP Backend Script ⭐ **RECOMMENDED**

**Why This is the Best Choice:**
- Your website already supports PHP (confirmed by existing PHP files)
- Most reliable and secure method
- Complete control over email formatting and validation
- Works directly with existing hosting infrastructure
- No external dependencies or monthly fees

**Advantages:**
✅ Reliable email delivery  
✅ Server-side validation and security  
✅ Custom email templates  
✅ Spam protection capabilities  
✅ Works with any hosting provider  
✅ No usage limits or external dependencies  

**Requirements:**
- PHP hosting with mail() function enabled
- Basic server configuration

---

### Option 2: Third-Party Email Services

**Popular Services:**
- **Formspree** - Simple form handling service
- **EmailJS** - Client-side email sending
- **Netlify Forms** - For sites hosted on Netlify
- **Getform** - Form backend service

**Advantages:**
✅ Quick setup  
✅ Built-in spam protection  
✅ No server configuration needed  

**Disadvantages:**
❌ External dependency  
❌ Monthly costs for higher usage  
❌ Limited customization  
❌ Potential service outages  
❌ Data sent to third parties  

---

### Option 3: Client-Side Only Solutions ❌ **NOT RECOMMENDED**

**Why Not Recommended:**
- Cannot directly send emails from browser for security reasons
- Requires user's email client to be configured
- Poor user experience
- Unreliable delivery

---

## PHP Implementation Guide

### Step 1: Create PHP Email Handler

**File:** `/contact-handler.php`

```php
<?php
// Configuración de seguridad
session_start();
header('Content-Type: application/json; charset=utf-8');

// Configuración de email
$to_email = "pgbpowerelectronics@gmail.com";
$from_name = "PGB Website Contact Form";
$subject_prefix = "[PGB Contact] ";

// Función de sanitización
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Función de validación de email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Verificar método POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener y sanitizar datos del formulario
$nombre = sanitize_input($_POST['nombre'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$telefono = sanitize_input($_POST['telefono'] ?? '');
$asunto = sanitize_input($_POST['asunto'] ?? '');
$mensaje = sanitize_input($_POST['mensaje'] ?? '');

// Array de errores
$errors = [];

// Validaciones
if (empty($nombre) || strlen($nombre) < 2) {
    $errors[] = 'El nombre debe tener al menos 2 caracteres';
}

if (empty($email) || !validate_email($email)) {
    $errors[] = 'Por favor ingrese un email válido';
}

if (empty($asunto) || strlen($asunto) < 5) {
    $errors[] = 'El asunto debe tener al menos 5 caracteres';
}

if (empty($mensaje) || strlen($mensaje) < 20) {
    $errors[] = 'El mensaje debe tener al menos 20 caracteres';
}

// Si hay errores, retornar
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode('. ', $errors)]);
    exit;
}

// Crear el mensaje de email
$email_subject = $subject_prefix . $asunto;
$email_body = "
NUEVA CONSULTA DESDE EL SITIO WEB
=================================

Nombre: $nombre
Email: $email
Teléfono: $telefono
Asunto: $asunto

Mensaje:
$mensaje

=================================
Enviado desde: PGB Electrónica Industrial Website
Fecha: " . date('Y-m-d H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'] . "
";

// Configurar headers
$headers = [
    'From: ' . $from_name . ' <noreply@pgbelectronics.com>',
    'Reply-To: ' . $email,
    'Return-Path: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

// Enviar email
$mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    echo json_encode([
        'success' => true, 
        'message' => '¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error al enviar el mensaje. Por favor intente nuevamente o contáctenos directamente.'
    ]);
}
?>
```

### Step 2: Update Contact Form HTML

**Modify `contact.html` form section:**

```html
<form id="contactForm" action="contact-handler.php" method="post" class="mt-4">
    <div id="form-messages" class="alert d-none" role="alert"></div>
    
    <div class="row g-3">
        <div class="col-md-6">
            <input type="text" class="form-control" id="nombre" name="nombre" 
                   placeholder="Su nombre completo" required minlength="2">
        </div>
        <div class="col-md-6">
            <input type="email" class="form-control" id="email" name="email" 
                   placeholder="correo@ejemplo.com" required>
        </div>
        <div class="col-12">
            <input type="tel" class="form-control" id="telefono" name="telefono" 
                   placeholder="+56 9 XXXX XXXX" pattern="[+]?[0-9\s\-()]*">
        </div>
        <div class="col-12">
            <input type="text" class="form-control" id="asunto" name="asunto" 
                   placeholder="Asunto de su consulta" required minlength="5">
        </div>
        <div class="col-12">
            <textarea class="form-control" id="mensaje" name="mensaje" rows="5" 
                      placeholder="Escriba su mensaje aquí..." required minlength="20"></textarea>
        </div>
        <div class="col-12">
            <button class="btn btn-primary w-100 py-3" type="submit" id="submit-btn">
                <span class="btn-text">
                    <i class="fa fa-paper-plane me-2"></i>Enviar Mensaje
                </span>
                <span class="btn-loading d-none">
                    <i class="fa fa-spinner fa-spin me-2"></i>Enviando...
                </span>
            </button>
        </div>
    </div>
</form>
```

### Step 3: JavaScript Enhancement

**Add to `js/main.js`:**

```javascript
// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');
    const formMessages = document.getElementById('form-messages');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }
    
    function handleFormSubmission() {
        // Show loading state
        toggleLoadingState(true);
        hideMessage();
        
        // Create FormData object
        const formData = new FormData(contactForm);
        
        // Send AJAX request
        fetch('contact-handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            toggleLoadingState(false);
            
            if (data.success) {
                showMessage(data.message, 'success');
                contactForm.reset();
            } else {
                showMessage(data.message, 'error');
            }
        })
        .catch(error => {
            toggleLoadingState(false);
            showMessage('Error de conexión. Por favor intente nuevamente.', 'error');
            console.error('Form submission error:', error);
        });
    }
    
    function toggleLoadingState(loading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            btnText.classList.add('d-none');
            btnLoading.classList.remove('d-none');
            submitBtn.disabled = true;
        } else {
            btnText.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            submitBtn.disabled = false;
        }
    }
    
    function showMessage(message, type) {
        formMessages.className = `alert alert-${type === 'success' ? 'success' : 'danger'}`;
        formMessages.textContent = message;
        formMessages.classList.remove('d-none');
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => hideMessage(), 5000);
        }
    }
    
    function hideMessage() {
        formMessages.classList.add('d-none');
    }
});
```

---

## Alternative: Third-Party Service Implementation

### Option A: Formspree Integration

**Step 1:** Sign up at [formspree.io](https://formspree.io)

**Step 2:** Update form action:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Add hidden field for email -->
    <input type="hidden" name="_to" value="pgbpowerelectronics@gmail.com">
    <input type="hidden" name="_subject" value="Nueva consulta desde PGB website">
    <!-- Your existing form fields -->
</form>
```

**Pros:** Quick setup, free tier available  
**Cons:** External dependency, limited customization

### Option B: EmailJS Integration

**Step 1:** Sign up at [emailjs.com](https://www.emailjs.com/)

**Step 2:** Configure email service and template

**Step 3:** Add EmailJS JavaScript:
```javascript
emailjs.send("service_id", "template_id", {
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    mensaje: formData.get('mensaje')
});
```

---

## Hosting Configuration Requirements

### PHP Mail Configuration

**Check if mail() function is enabled:**
```php
<?php
if (function_exists('mail')) {
    echo "Mail function is available";
} else {
    echo "Mail function is NOT available";
}
phpinfo(); // Check mail configuration
?>
```

### Common Chilean Hosting Providers Configuration

**For providers like:**
- WebHosting Chile
- NIC Chile
- FastNet Chile
- SiteGround

**Typical settings:**
- SMTP Server: Usually provided by hosting company
- Port: 587 (TLS) or 465 (SSL)
- Authentication: Required
- PHP mail() function: Usually enabled by default

### Advanced: Using PHPMailer (If mail() function is limited)

```php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.your-provider.cl';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@domain.com';
$mail->Password = 'your-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

---

## Security Best Practices

### 1. Input Validation
- Sanitize all input data
- Validate email addresses
- Check field length limits
- Remove potentially dangerous characters

### 2. Spam Protection
```php
// Honeypot field (hidden from users)
if (!empty($_POST['honeypot'])) {
    // This is likely a bot
    exit;
}

// Rate limiting (basic implementation)
$ip = $_SERVER['REMOTE_ADDR'];
$time_limit = 60; // seconds
$max_attempts = 3;

// Check submission rate per IP
```

### 3. CSRF Protection
```php
// Generate CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Verify CSRF token
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    die('CSRF token mismatch');
}
```

---

## Testing Procedures

### 1. Local Testing
1. Set up local PHP server: `php -S localhost:8000`
2. Test form submission with various data
3. Verify email receipt and formatting
4. Test validation errors

### 2. Staging Environment
1. Deploy to staging server
2. Test email delivery
3. Verify all form fields work correctly
4. Test responsive design

### 3. Production Testing
1. Deploy to production
2. Send test emails
3. Monitor for any delivery issues
4. Set up email monitoring

---

## Email Template Customization

### Professional Email Format
```php
$email_body = "
╔════════════════════════════════════════╗
║        PGB ELECTRÓNICA INDUSTRIAL       ║
║           NUEVA CONSULTA                ║
╚════════════════════════════════════════╝

📋 DATOS DEL CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nombre: $nombre
📧 Email: $email
📱 Teléfono: $telefono
📝 Asunto: $asunto

💬 MENSAJE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$mensaje

ℹ️ INFORMACIÓN TÉCNICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Fecha: " . date('d/m/Y H:i:s') . "
🌐 IP: " . $_SERVER['REMOTE_ADDR'] . "
🖥️ Navegador: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'No disponible') . "

══════════════════════════════════════════
Este mensaje fue enviado desde el formulario 
de contacto del sitio web de PGB Electrónica Industrial.
";
```

---

## Troubleshooting Guide

### Common Issues and Solutions

**1. Emails not being received**
- Check spam/junk folder
- Verify hosting provider mail() function is enabled
- Check email headers configuration
- Verify recipient email address

**2. Form submission errors**
- Check PHP error logs
- Verify file permissions on contact-handler.php
- Ensure all required fields are being sent
- Check server PHP version compatibility

**3. Character encoding issues**
- Ensure UTF-8 encoding in PHP script
- Set proper Content-Type headers
- Verify HTML form charset

**4. Hosting-specific issues**
- Some shared hosting providers disable mail() function
- May need to use SMTP authentication
- Check hosting provider documentation

---

## Deployment Checklist

### Before Going Live
- [ ] Test form on staging environment
- [ ] Verify email delivery to pgbpowerelectronics@gmail.com
- [ ] Test all validation scenarios
- [ ] Check responsive design on mobile devices
- [ ] Verify CSRF protection is working
- [ ] Test rate limiting functionality
- [ ] Check error handling for all scenarios

### Post-Deployment
- [ ] Send test email and confirm receipt
- [ ] Monitor server logs for errors
- [ ] Set up email delivery monitoring
- [ ] Document any hosting-specific configuration
- [ ] Create backup of working configuration

---

## Maintenance and Monitoring

### Regular Checks
1. **Weekly:** Test form submission
2. **Monthly:** Review spam submissions
3. **Quarterly:** Update security measures
4. **Annually:** Review and update email templates

### Performance Monitoring
- Track form submission success rates
- Monitor email delivery times
- Review error logs regularly
- Track spam/bot submissions

---

## Contact Information Integration

**Current PGB Contact Details:**
- **Email:** pgbpowerelectronics@gmail.com
- **Phone:** +56932735031
- **Address:** José Antonio Valdés 2482 Cia Baja, La Serena, Coquimbo
- **Website Language:** Spanish
- **Business Hours:** Mon-Fri: 09:00-18:00, Sat-Sun: 09:00-14:00

---

*Document Created: August 2025*  
*Project: PGB Electrónica Industrial - Email Integration*  
*Status: Implementation Ready*  
*Companion Document: contact-form-implementation.md*
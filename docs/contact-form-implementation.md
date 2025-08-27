# Contact Form Implementation Plan
## PGB Electrónica Industrial Website

### Project Overview
This document outlines the implementation plan for adding a contact form to the PGB Electrónica Industrial website. The website is a Spanish-language business site for an industrial electronics company based in La Serena, Coquimbo, Chile.

**Current Website Features:**
- Responsive design using Bootstrap framework
- Spanish language content
- Contact page with Google Maps integration
- Company information display
- Social media integration (Facebook, LinkedIn, WhatsApp)

---

## Contact Form Requirements

### Objective
Add a professional contact form to the existing contact information display box in `contact.html` to enable direct customer inquiries through the website.

### Target Location
- **File:** `contact.html`
- **Section:** Contact information display box (lines 126-137)
- **Layout:** Right column of the two-column contact section

---

## Technical Implementation Plan

### 1. Layout Modification Strategy
**Current Structure:**
```html
<div class="col-md-6 wow d-none d-lg-block fadeInUp" data-wow-delay="0.1s">
    <div class="bg-light p-5 h-100 d-flex align-items-center">
        <!-- Static contact information -->
    </div>
</div>
```

**Proposed Structure:**
- Expand the contact box to accommodate both contact info and form
- Split into two sections:
  - **Top Section:** Company contact details (existing)
  - **Bottom Section:** Contact form (new)

### 2. Form Field Specifications

| Field Name | Type | Required | Validation | Placeholder |
|------------|------|----------|------------|-------------|
| **Nombre** | text | Yes | Min 2 characters | "Su nombre completo" |
| **Email** | email | Yes | Valid email format | "correo@ejemplo.com" |
| **Teléfono** | tel | No | Chilean phone format | "+56 9 XXXX XXXX" |
| **Asunto** | text | Yes | Min 5 characters | "Asunto de su consulta" |
| **Mensaje** | textarea | Yes | Min 20 characters | "Escriba su mensaje aquí..." |

### 3. Form HTML Structure
```html
<form id="contactForm" action="" method="post" class="mt-4">
    <div class="row g-3">
        <div class="col-md-6">
            <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Su nombre completo" required>
        </div>
        <div class="col-md-6">
            <input type="email" class="form-control" id="email" name="email" placeholder="correo@ejemplo.com" required>
        </div>
        <div class="col-12">
            <input type="tel" class="form-control" id="telefono" name="telefono" placeholder="+56 9 XXXX XXXX">
        </div>
        <div class="col-12">
            <input type="text" class="form-control" id="asunto" name="asunto" placeholder="Asunto de su consulta" required>
        </div>
        <div class="col-12">
            <textarea class="form-control" id="mensaje" name="mensaje" rows="5" placeholder="Escriba su mensaje aquí..." required></textarea>
        </div>
        <div class="col-12">
            <button class="btn btn-primary w-100 py-3" type="submit">
                <i class="fa fa-paper-plane me-2"></i>Enviar Mensaje
            </button>
        </div>
    </div>
</form>
```

---

## Styling Guidelines

### 1. Color Scheme Consistency
- **Primary Color:** Use existing `btn-primary` class
- **Background:** Match existing `bg-light` for form sections
- **Text:** Follow existing text color hierarchy

### 2. Bootstrap Classes to Use
- `form-control` for input styling
- `btn btn-primary` for submit button
- `row g-3` for form grid layout
- `col-md-6`, `col-12` for responsive columns

### 3. Custom Styling Considerations
- Maintain existing padding and margin patterns
- Ensure form blends seamlessly with contact info
- Add subtle borders or separators if needed

---

## Validation Implementation

### 1. HTML5 Validation
- Use `required` attribute for mandatory fields
- Use `type="email"` for email validation
- Use `type="tel"` for phone number input
- Set `minlength` attributes where appropriate

### 2. JavaScript Validation
```javascript
// Form validation function
function validateContactForm() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validation logic
    if (nombre.length < 2) {
        showError('El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Por favor ingrese un email válido');
        return false;
    }
    
    if (asunto.length < 5) {
        showError('El asunto debe tener al menos 5 caracteres');
        return false;
    }
    
    if (mensaje.length < 20) {
        showError('El mensaje debe tener al menos 20 caracteres');
        return false;
    }
    
    return true;
}
```

### 3. Error Handling
- Display validation errors in Spanish
- Use Bootstrap alert classes for error styling
- Provide clear, user-friendly error messages

---

## Integration Plan

### Step 1: Backup Current File
Create a backup of `contact.html` before making changes.

### Step 2: Modify Contact Section
1. Update the right column structure
2. Add form HTML after existing contact information
3. Maintain existing Bootstrap classes and responsive behavior

### Step 3: Add JavaScript
1. Add form validation JavaScript to `js/main.js`
2. Include form submission handling
3. Add success/error message display functionality

### Step 4: Test Responsive Design
1. Test on desktop (lg breakpoint)
2. Test on tablet (md breakpoint)
3. Test on mobile (sm breakpoint)

---

## Responsive Design Considerations

### Desktop (lg and above)
- Form appears in right column alongside contact info
- Full form width within column constraints

### Tablet (md)
- Form may stack below contact information
- Maintain readability and usability

### Mobile (sm and below)
- Currently hidden with `d-none d-lg-block`
- Consider making form visible on mobile
- Stack form fields vertically

---

## Accessibility Features

### ARIA Labels
```html
<input type="text" 
       class="form-control" 
       id="nombre" 
       name="nombre" 
       placeholder="Su nombre completo"
       aria-label="Nombre completo"
       required>
```

### Focus Management
- Ensure proper tab order
- Provide focus indicators
- Use semantic HTML elements

### Screen Reader Support
- Add `aria-describedby` for error messages
- Use `role` attributes where appropriate
- Provide alternative text for icons

---

## Future Enhancements

### Backend Integration
1. **PHP Handler:** Create form processing script
2. **Email Service:** Implement email sending functionality
3. **Database Storage:** Store form submissions for follow-up
4. **Spam Protection:** Add CAPTCHA or similar protection

### Advanced Features
1. **File Upload:** Allow customers to attach files
2. **Service Selection:** Dropdown for specific services
3. **Appointment Booking:** Integration with calendar system
4. **Auto-response:** Send confirmation emails to customers

### Analytics
1. **Form Analytics:** Track form completion rates
2. **Conversion Tracking:** Monitor form submissions
3. **A/B Testing:** Test different form layouts

---

## Implementation Checklist

- [ ] Create backup of contact.html
- [ ] Modify HTML structure to accommodate form
- [ ] Add form HTML with proper Bootstrap styling
- [ ] Implement JavaScript validation
- [ ] Add error/success message handling
- [ ] Test responsive design across breakpoints
- [ ] Verify accessibility compliance
- [ ] Test form submission (client-side)
- [ ] Document any additional dependencies

---

## Technical Dependencies

### Existing Dependencies (Already Available)
- Bootstrap 5.0.0
- Font Awesome 5.10.0
- jQuery 3.4.1

### No Additional Dependencies Required
The implementation uses existing libraries and frameworks already included in the project.

---

## Contact Information for Reference
- **Company:** PGB Electrónica Industrial
- **Address:** José Antonio Valdés 2482 Cia Baja, La Serena, Coquimbo
- **Phone:** +56932735031
- **Email:** pgbpowerelectronics@gmail.com
- **Website Language:** Spanish
- **Target Audience:** Industrial electronics customers in Chile

---

*Document created: August 2025*  
*Project: PGB Electrónica Industrial Website Enhancement*  
*Status: Implementation Ready*
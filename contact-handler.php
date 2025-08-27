<?php
// Configuración de seguridad
session_start();
header('Content-Type: application/json; charset=utf-8');

// Configuración de email
$to_email = "azubair64@gmail.com";
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
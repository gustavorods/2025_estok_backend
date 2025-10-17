const sendEmail = require('../services/emailService')

async function welcomoEmployee(name, email, password) {   
    // Taking the current year
    const currentYear = new Date().getFullYear();
    
    // HTML template
    const html = `<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo à Estok!</title>
    <style>
        body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
        }
        .container {
        max-width: 600px;
        background: #ffffff;
        margin: 40px auto;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
        }
        .header {
        background: linear-gradient(135deg, #F7CB44, #d8a408);
        color: white;
        text-align: center;
        padding: 40px 20px;
        }
        .header h1 {
        margin: 0;
        font-size: 26px;
        font-weight: 600;
        }
        .content {
        padding: 30px 40px;
        color: #333333;
        line-height: 1.6;
        }
        .content h2 {
        color: #26334d;
        font-size: 20px;
        margin-bottom: 10px;
        }
        .credentials {
        background-color: #f0f7ff;
        border-left: 4px solid #26334d;
        padding: 15px 20px;
        margin: 20px 0;
        border-radius: 8px;
        }
        .credentials p {
        margin: 6px 0;
        font-size: 15px;
        }
        .credentials span {
        font-weight: 600;
        color: #26334d;
        }
        .footer {
        text-align: center;
        font-size: 13px;
        color: #777;
        padding: 25px 10px 35px;
        border-top: 1px solid #eaeaea;
        }
        .footer a {
        color: #0078d7;
        text-decoration: none;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
        <h1>Bem-vindo à equipe Estok!</h1>
        </div>
        <div class="content">
        <p>Olá, <strong>${name}</strong> 👋</p>
        <p>Seja muito bem-vindo(a) à nossa equipe! Sua conta foi criada com sucesso e você já pode acessar o sistema da <strong>Estok</strong>.</p>
        
        <h2>Suas credenciais de acesso</h2>
        <div class="credentials">
            <p><strong>Email:</strong> <span>${email}</span></p>
            <p><strong>Senha:</strong> <span>${password}</span></p>
        </div>

        <p>Por segurança, recomendamos que altere sua senha assim que fizer o primeiro acesso.</p>
        <p>Estamos muito felizes em ter você com a gente!</p>
        </div>
        <div class="footer">
        <p>©${currentYear} Estok. Todos os direitos reservados.</p>
        <p>Este é um email automático — não responda.</p>
        </div>
    </div>
    </body>
    </html>
    `
    // ask the server to send email
    const result = await sendEmail(email, "Bem-Vindo à Estok!", "Bem-vindo à Estok! Verifique seu email para as credenciais.", html)

    // If any error occurs
    if (!result.status) {
        return {
            status: false, 
            message: "Unable to send welcome email",
            error: result.error
        }
    }

    return { 
        status: true,
        message: "Welcome email sent"
    };
}

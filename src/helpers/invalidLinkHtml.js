export const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invalid Link</title>
        <style>
          body {
            background: #171717;
            color: #fbf8ef;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: sans-serif;
            text-align: center;
            padding: 1rem;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          p {
            opacity: 0.8;
            margin-bottom: 1.5rem;
          }
          a.button {
            background-color: #84ebad;
            color: #171717;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }
          a.button:hover {
            background-color: #16a34a;
          }
            .logo{
                font-size: 32px;
                color: #ffffff;
                margin-bottom: 20px;
            }
            .logostart{
                font-size: 32px;
                color: #84ebad;
            }
        </style>
      </head>
      <body>
        <div class="logo">
            <span class="logostart">snap</span><span>/short</span>
        </div>
        <h1>Invalid or Expired Link</h1>
        <p>This short link doesn't exist or is no longer valid.</p>
        <a class="button" href="/">Create New Link</a>
      </body>
      </html>
    `;
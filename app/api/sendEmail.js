import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, cartItems, total } = req.body;

    try {
      // Configure the Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail; adjust for other providers
        auth: {
          user: 'dhavish23@gmail.com', // Replace with your email
          pass: 'root',   // Replace with your app password
        },
      });

      // Build the email content
      const emailContent = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your purchase! Here are your order details:</p>
        <ul>
          ${cartItems
            .map(
              (item) =>
                `<li>${item.name} - Quantity: ${item.quantity} - Subtotal: $${(
                  item.price * item.quantity
                ).toFixed(2)}</li>`
            )
            .join('')}
        </ul>
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
      `;

      // Send the email
      await transporter.sendMail({
        from: 'dhavish23@gmail.com', // Replace with your email
        to: email, // The user's email
        subject: 'Order Confirmation',
        html: emailContent,
      });

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email.', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

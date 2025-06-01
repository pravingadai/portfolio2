import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";

// Email form validation schema
const emailSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Email sending endpoint
  app.post("/api/send-email", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = emailSchema.parse(req.body);
      
      // Create a test account on Ethereal for demonstration purposes
      // This allows us to test the email functionality without real credentials
      const testAccount = await nodemailer.createTestAccount();
      
      // Create a test SMTP transporter object using the generated Ethereal credentials
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      // Setup email data
      let mailOptions = {
        from: `"Portfolio Contact" <${validatedData.email}>`,
        to: "pravingadai@hotmail.com", // Recipient's email
        subject: `[Portfolio Contact] ${validatedData.subject}`,
        text: `Message from: ${validatedData.name} (${validatedData.email})\n\n${validatedData.message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #05DBB8; border-bottom: 1px solid #05DBB8; padding-bottom: 10px;">New Portfolio Contact Message</h2>
            <p><strong>From:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-left: 3px solid #05DBB8;">
              <p style="white-space: pre-line;">${validatedData.message}</p>
            </div>
            <p style="color: #888; margin-top: 30px; font-size: 12px;">Sent from your Portfolio Website</p>
          </div>
        `
      };

      // Send mail
      let info = await transporter.sendMail(mailOptions);

      // Return success along with the preview URL for Ethereal emails
      res.status(200).json({ 
        success: true, 
        messageId: info.messageId,
        // For Ethereal emails, include the preview URL so you can view the test email
        previewUrl: nodemailer.getTestMessageUrl(info)
      });
      
    } catch (error) {
      // Log the error for debugging
      console.error("Email sending error:", error);
      
      // Send appropriate error response
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          error: "Validation error", 
          details: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        error: "Failed to send email" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

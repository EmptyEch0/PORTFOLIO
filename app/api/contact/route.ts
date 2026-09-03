import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Graceful fallback for local development or before API key is set
      console.warn('RESEND_API_KEY is missing. Simulating successful submission.');
      return NextResponse.json({
        success: true,
        message: 'Message received! Please configure RESEND_API_KEY in .env.local to receive live emails.'
      });
    }

    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['likhithmanakala@gmail.com'],
      replyTo: email,
      subject: `New Message from ${name} via Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; font-size: 15px; line-height: 1.6;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}

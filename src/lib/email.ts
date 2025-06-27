
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,         // deadsimpleform@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // app password (NOT Gmail password)
  },
});

export async function sendSubmissionEmail({
  to,
  formName,
  submissionData,
}: {
  to: string;
  formName: string;
  submissionData: Record<string, any>;
}) {
  const submissionHtml = Object.entries(submissionData)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join("");

  await transporter.sendMail({
    from: `"DeadSimpleForm" <${process.env.GMAIL_USER}>`,
    to,
    subject: `New submission to "${formName}"`,
    html: `
      <h3>You received a new submission on <b>${formName}</b></h3>
      <ul>${submissionHtml}</ul>
    `,
  });
}

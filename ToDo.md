# Priority 0
- setup backend for pricing page
- Logout functionality (frontend + invalidate Supabase session) 

# To Do
- Payment processor - application submitted
- Enable server level encryption
- fix the login/signup page theme and text font
- Handle redirect post form submission via public api endpoint
- pricing page to link to checkout to start membership 
- setup differnet features based on the user tiers

- finalize docs page
- finalize features page
- finalize pricing page

form managment 
- make sure that when the user deletes their account, their data gets deleted as well
- user can delete a form which is owned by them
    - after user has deleted a form, the respective data should get deleted
- edit form metadata, name of the form

web hooks
- test out current webhooks implementation

email notification
- Send email to site owner on new submission
- Custom email templates
- Add multiple recipients
- Toggle email notifications per form
- Use custom SMTP (optional)

submission dashboad
- filter by form
- sort by date and other filters
- search through submissions 
- delete individual submissions by the owner of the form
- bulk delete submissions
- pagination of infinte scroll for submissions

customization 
- enable/disable form
- custom field validation
- form expiration date
- Hidden fields support
- Honeypot spam field 


form logic and automatio
- Form Logic & Automation
- Conditional email routing
- Auto-tagging based on field content
- Auto-forward to another API
- Delay email delivery
- Conditional redirects
- Limit one submission per IP/email
- Blocklist for IPs or emails
- Submission deduplication
- Scheduled exports
- Auto-purge submissions after X days

docs
- Live demo form
- Embed-ready code snippets
- Docs with curl + HTML examples
- SEO optimized marketing site
- Tutorial videos
- Blog with use cases

ux
- dark mode
- Form usage analytics
- 

ai 
- give the topic, the ai uses the custom form id and creates the form in the language as per the specs
- mcp?

Testing
- Test various form use case scenarios
- automate testing?



# Done

- Remove the XLSX module - Done
- Fix Supabase Auth Helper Dependency - Done
- Add DNS to vercel
- Create Waitlist for the product and landing page
- make form slug auto generated when creating a new form
- copy button for form endpoint url
- Add Header

- Improve api documentation
- add docs page
- add features page
- add pricing page
- fix header buttons and functionality
- Make the my form section auto update after the new form has been created
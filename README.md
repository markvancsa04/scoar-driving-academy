# Scoar Driving Academy

Create a complete, professional, modern website for AUTOSISKOLA SCOBAR, a driving school located in Târgu Secuiesc (Kézdivásárhely), Romania.

IMPORTANT:
This should look like a real, finished, professional driving school website — NOT like a template, prototype, demo, test project, or unfinished concept.

The website must be designed from the beginning with a fully editable and replaceable structure. Do NOT hardcode content into individual components. Organize all repeated and changeable content in a clean, centralized structure so that text, images, instructors, cars, services, reviews, contact details, opening hours, social links, and other business information can easily be replaced later.

Use realistic placeholder content where exact current business information is unavailable, but make every piece of content easy to replace.

BRAND

Business name:
AUTOSISKOLA SCOBAR

Location:
Târgu Secuiesc / Kézdivásárhely, Romania

Business type:
Driving school

Main focus:
Category B driving licence training

The visual identity should communicate:

professionalism

trust

safety

confidence

modern education

experienced instructors

a friendly learning environment

Do NOT make the design look generic or like a typical AI-generated template.

DESIGN DIRECTION

Create a premium automotive-inspired design.

Use:

modern typography

strong visual hierarchy

high-quality driving/car imagery

subtle automotive details

clean cards

smooth rounded corners

tasteful shadows

professional spacing

subtle animations

excellent mobile responsiveness

The design should feel similar to a modern premium driving school brand.

Avoid:

excessive gradients

childish graphics

cartoon-style elements

excessive animations

generic stock-template appearance

huge amounts of text

cluttered layouts

Use a professional color system that works well for a driving school and allows the brand colors to be changed easily later.

Create reusable design tokens for:

primary color

secondary color

accent color

background

text

muted text

borders

buttons

WEBSITE STRUCTURE

Build the following pages/sections:

1. HOME

Hero section:

powerful automotive/driving image

AUTOSISKOLA SCOBAR branding

strong headline

short supporting text

primary CTA: "Înscrie-te acum"

secondary CTA: "Află mai multe"

small trust indicators

Example headline direction:
"Învață să conduci cu încredere."

Do not copy this exact wording if you can create something stronger.

Add a small trust/value area below the hero:

Experienced instructors

Modern vehicles

Practical training

Personal attention

All text must be editable.

2. ABOUT THE SCHOOL

Create a professional introduction section explaining the driving school's philosophy.

Highlight:

experience

professional instructors

patient teaching

modern learning methods

road safety

preparation for real-world driving, not only the exam

Add a large image and smaller supporting statistics/cards.

Statistics must be editable placeholders, for example:

Years of experience

Successful students

Instructor experience

Training vehicles

Do NOT invent fake official statistics presented as facts. Clearly structure them as editable content.

3. SERVICES

Create service cards for:

Category B driving licence

Theory preparation

Practical driving lessons

Exam preparation

Additional driving lessons

Beginner support

Each service should have:

icon

title

short description

optional CTA

All services must be stored in a reusable data structure.

4. INSTRUCTORS

Create a professional instructor section.

Each instructor card should support:

profile image

name

role

short biography

years of experience

categories

optional contact button

Use realistic placeholder instructor profiles, but make it extremely easy to replace them later.

Do not hardcode individual instructor components.

Use one reusable InstructorCard component driven by data.

5. VEHICLES

Create a modern vehicle showcase.

Each vehicle should have:

large image

vehicle name

transmission

fuel/type

short description

optional specifications

Use reusable vehicle data.

Make it easy to add or remove vehicles without changing the page structure.

6. WHY CHOOSE US

Create a strong visual section with 5–6 reasons to choose AUTOSISKOLA SCOBAR.

Examples:

Experienced instructors

Patient and supportive teaching

Modern vehicles

Individual attention

Practical approach

Exam-focused preparation

Use icons and concise descriptions.

7. HOW IT WORKS

Create a simple 4-step process:

Contact us

Registration

Theory + practical training

Exam and licence

Make the steps visually engaging and easy to understand.

8. REVIEWS

Create a premium testimonials section.

Include 6 editable placeholder reviews.

Each review should support:

name

review text

rating

optional profile image

Use a reusable ReviewCard component.

Do not present invented reviews as verified real customer reviews. Structure them clearly as editable placeholder content until real reviews are added.

9. FAQ

Create a professional FAQ section.

Include questions around:

How can I register?

What documents are required?

How does Category B training work?

How are practical lessons scheduled?

How long does the course take?

How does the exam process work?

Can I take additional driving lessons?

Where does the practical training take place?

Use an accordion component.

All questions and answers must be editable from a centralized data structure.

10. CTA SECTION

Create a visually strong final CTA.

Headline:
"Ready to start your journey?"

But adapt the final copy to Romanian/Hungarian depending on the site's language strategy.

Include:

phone CTA

registration CTA

short motivational text

11. CONTACT

Create a complete contact section with:

business name

address

phone

email placeholder

opening hours

social media links

Google Maps location

contact form

Use the known business information where appropriate.

Current known information:
Address: Curtea 39, Târgu Secuiesc 525400, Romania
Phone: +40 724 527 584
Opening hours: Monday–Friday, 09:00–17:00

Make all of these editable.

Do not hardcode them directly inside multiple components.

12. FOOTER

Create a professional footer containing:

logo/business name

short description

navigation

services

contact information

social media

copyright

privacy policy

terms

LANGUAGE

The visible website should primarily be in Hungarian, because AUTOSISKOLA SCOBAR serves the local Hungarian-speaking community in Kézdivásárhely.

However, structure the application so that adding Romanian later is easy.

Do NOT hardcode text throughout JSX/TSX files.

Create a centralized content/configuration structure so translations can be added later.

CONTENT ARCHITECTURE

This is extremely important.

Create a clean content/data architecture.

For example, separate editable data into structures such as:

siteSettings

navigation

heroContent

aboutContent

services

instructors

vehicles

advantages

processSteps

testimonials

faqItems

contactInfo

socialLinks

footerContent

Components should consume this data instead of containing large amounts of hardcoded content.

The goal is that later I can replace:

all text

images

instructors

vehicles

services

reviews

FAQ

contact details

phone number

address

social media

logo

colors

without rebuilding the website.

IMAGE ARCHITECTURE

Do not permanently depend on random external image URLs.

Create a clean image/content configuration system.

Every image should have a clearly identifiable purpose:

hero image

about image

instructor images

vehicle images

gallery images

testimonial images

Use high-quality temporary images for now, but structure everything so they can easily be replaced later.

GALLERY

Add a professional photo gallery section.

Use a responsive grid with:

driving lessons

vehicles

instructors

school environment

road training

Use placeholder images initially.

The gallery should support adding/removing images without redesigning the page.

NAVIGATION

Create a sticky modern navigation bar.

Navigation:

Acasă

Despre noi

Servicii

Instructori

Autovehicule

Recenzii

Întrebări

Contact

Include a strong "Înscriere" CTA.

On mobile, create a polished mobile navigation menu.

RESPONSIVENESS

The entire website must be fully responsive.

Optimize for:

desktop

laptop

tablet

mobile

Pay particular attention to:

hero height

navigation

cards

typography

image cropping

CTA buttons

contact forms

UX

Add subtle professional interactions:

hover states

smooth scrolling

reveal animations

button transitions

card interactions

Keep animations fast and subtle.

Do not over-animate the website.

SEO

Create proper SEO foundations:

editable page title

editable meta description

Open Graph metadata

semantic HTML

proper H1/H2/H3 hierarchy

image alt text

local business information

clean URLs

Create the structure so SEO content can be edited later.

CODE QUALITY

Use:

reusable components

clean folder structure

TypeScript

responsive CSS

reusable UI components

centralized content configuration

no duplicated components

no unnecessary hardcoded content

Avoid creating one-off components for every card.

For repeated content, use reusable components and arrays/data objects.

IMPORTANT FINAL REQUIREMENT

Build this as if you are delivering the real official website of AUTOSISKOLA SCOBAR, not a test website.

The website should immediately look credible enough to present to the business owner.

At the same time, architect it so that every important business element can later be changed without redesigning or rewriting the application.

Prioritize:

Professional visual design

Realistic driving-school experience

Easy content replacement

Reusable components

Mobile responsiveness

SEO

Clean architecture

Conversion-focused CTAs

Do not mention anywhere on the website that this is a demo, prototype, template, test, concept, AI-generated website, or placeholder project.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/16997e37-6a6d-46e3-a940-0c0d0fca35c2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

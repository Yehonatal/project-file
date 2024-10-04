# **Project Documentation: File Management System**

## **Table of Contents**

- [**Project Documentation: File Management System**](#project-documentation-file-management-system)
  - [**Table of Contents**](#table-of-contents)
    - [**Project Overview**](#project-overview)
    - [**Tech Stack**](#tech-stack)
    - [**Initial Setup**](#initial-setup)
    - [**Frontend (Next.js)**](#frontend-nextjs)
      - [**Routing and Pages**](#routing-and-pages)
      - [**State Management**](#state-management)
      - [**Data Fetching**](#data-fetching)
      - [**Error Handling**](#error-handling)
    - [**UI (Shadcn)**](#ui-shadcn)
      - [**Component Structure**](#component-structure)
      - [**Styling**](#styling)
      - [**Icons (Lucide Icons)**](#icons-lucide-icons)
    - [**Backend (Convex)**](#backend-convex)
      - [**Database Schema**](#database-schema)
      - [**API Design**](#api-design)
      - [**Data Handling**](#data-handling)
    - [**Authentication (Clerk)**](#authentication-clerk)
      - [**Auth Setup**](#auth-setup)
      - [**Protected Routes**](#protected-routes)
    - [**Challenges and Errors**](#challenges-and-errors)
    - [**Future Improvements**](#future-improvements)

---

### **Project Overview**

- **Project Name**: File Management System
- **Description**: A mini google drive clone, With features that enable users to store different types of files on the cloud, get access to files, have organizational and personal accounts, search through and download files.
- **Objective**: Learn NextJs, Convex, and Clerk

---

### **Tech Stack**

- **Frontend**: Next.js
- **UI Library**: Shadcn
- **Backend**: Convex
- **Authentication**: Clerk
- **Icons**: Lucide Icons

---

### **Initial Setup**

- **Environment Setup**: 
	- [NextJs quickstart with Convex](https://docs.convex.dev/quickstart/nextjs) 
		- Default For options `npx create-next-app@latest my-app` 
		- `npm install convex`
		- Set up a Convex dev deployment `npx convex dev` 
		- Create a client component for the Convex provider and Wire up the ConvexClientProvider (wrap the children of the body element with the provider)
		-  Verify you have Next's public convex url set up in .env
		- Run your next app `npm run dev`

	- [Clerk auth setup with Convex](https://docs.convex.dev/client/react/nextjs) 
		-  Create a new application on the clerk dashboard with the sign up option you prefer
 		- Copy and add the API keys to .env
		- Set up JWT for convex, Copy 	`Issuer` key and Apply changes 
		- create an auth config file Paste in the Issuer URL from the JWT template and set applicationID to "convex" (Deploy changes on convex)
		- Install clerk nextjs `npm install @clerk/nextjs`
		- Wrap the convex provider with the clerk provider 
		- Create a clerk middleware file [Auth to end points faster](https://clerk.com/docs/references/nextjs/clerk-middleware)
			- You can add public routes `publicRoutes: ["/];` 
	- [Shadcn/ui set up on next](https://ui.shadcn.com/docs/installation/next)
		- `npx shadcn@latest init`

- **Dependencies**: [List all major dependencies installed and why you used them.]

---

### **Frontend (Next.js)**

#### **Routing and Pages**

- **Overview**: [Explain how you structured your pages and set up routing. Mention any dynamic routing or API routes created.]
- **Examples**: [Provide examples of page and route structures, possibly with code snippets.]

#### **State Management**

- **Tools Used**: [Mention any libraries like React Context, Redux, or others.]
- **Approach**: [Explain how you manage the global/local state in your application.]

#### **Data Fetching**

- **Methods**: [Describe how you're fetching data from the backend (e.g., using `getServerSideProps`, `getStaticProps`, or `SWR`).]
- **Challenges**: [Mention any issues faced during data fetching, such as slow API responses or handling loading states.]

#### **Error Handling**

- **Overview**: [Explain how you handle errors in both the frontend and during API calls.]
- **Examples**: [Provide code examples of error boundaries, try-catch blocks, etc.]

---

### **UI (Shadcn + Lucide  Icons)**

#### **Component Structure**

- **Overview**: [Document the component structure, how reusable components are created, and how they interact with the Next.js pages.]
- **Example**: [Provide a structure of a key component, showing its props and functions.]

#### **Styling**

- **Tools**: [List the styling approach (e.g., CSS Modules, TailwindCSS, etc.) and explain any customizations.]
- **Examples**: [Highlight any key styling challenges or unique design aspects you implemented.]

#### **Icons (Lucide Icons)**

- **Overview**: [Explain how you integrated Lucide Icons with the UI components.]
- **Examples**: [Provide examples of how you used icons across the UI.]

---

### **Backend (Convex)**

#### **Database Schema**

- **Overview**: [Describe how the database is structured, the relationships between entities, and any specific schema decisions.]
- **Examples**: [Include code snippets of the schema design.]

#### **API Design**

- **Overview**: [Explain how the API is structured and what endpoints were created.]
- **Challenges**: [Document any design challenges, such as query optimizations or rate-limiting.]

#### **Data Handling**

- **Overview**: [Mention how you handle data mutations, transactions, and validations.]
- **Examples**: [Provide examples of key backend logic.]

---

### **Authentication (Clerk)**

#### **Auth Setup**

- **Steps**: [Explain the steps taken to set up Clerk and configure it with Next.js.]
- **Challenges**: [Document any specific challenges or key configurations.]

#### **Protected Routes**

- **Overview**: [Explain how you protect routes using Clerk authentication.]
- **Examples**: [Provide examples of protecting API routes or Next.js pages.]

---

### **Challenges and Errors**

- **Overview**: [Summarize all major challenges faced throughout the project.]
- **Solutions**: [Provide solutions or workarounds you implemented, along with lessons learned.]

---

### **Future Improvements**

- **Potential Features**: [List any additional features or improvements you’d like to add later.]
- **Optimizations**: [Mention performance optimizations or code refactoring plans.]

---
